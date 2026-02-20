import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedService } from '../services/supabase/feed';
import { feedKeys } from './queryKeys';
import { useAuth } from '../contexts/AuthContext';

export const useComments = (postId: string) => {
  const queryClient = useQueryClient();
  const { userProfile } = useAuth();

  const commentsQuery = useQuery({
    queryKey: feedKeys.comments(postId),
    queryFn: () => feedService.getComments(postId),
    staleTime: 2 * 60 * 1000,
    enabled: !!postId,
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) =>
      feedService.addComment(postId, userProfile!.id, content),
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: feedKeys.comments(postId) });
      await queryClient.cancelQueries({ queryKey: feedKeys.lists() });

      const previousComments = queryClient.getQueryData(feedKeys.comments(postId));
      const previousFeed = queryClient.getQueryData(feedKeys.lists());

      // Optimistic comment
      const newComment = {
        id: `temp-${Date.now()}`,
        author_id: userProfile!.id,
        author_name: `${userProfile!.first_name || ''} ${userProfile!.last_name || ''}`.trim() || 'You',
        author_avatar: userProfile!.avatar_url || '',
        author_verified: userProfile?.user_status === 'verified',
        content,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        has_liked: false,
      };

      queryClient.setQueryData(feedKeys.comments(postId), (old: any[] = []) => [
        newComment,
        ...old,
      ]);

      // Optimistically increment comment count in feed
      queryClient.setQueryData(feedKeys.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any[]) =>
            page.map((post) =>
              post.id === postId
                ? { ...post, comments_count: post.comments_count + 1 }
                : post
            )
          ),
        };
      });

      return { previousComments, previousFeed };
    },
    onError: (err, content, context) => {
      queryClient.setQueryData(feedKeys.comments(postId), context?.previousComments);
      queryClient.setQueryData(feedKeys.lists(), context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedKeys.comments(postId) });
      queryClient.invalidateQueries({ queryKey: feedKeys.lists() });
    },
  });

  return {
    comments: commentsQuery.data ?? [],
    isLoading: commentsQuery.isLoading,
    addComment: addCommentMutation.mutateAsync,
  };
};