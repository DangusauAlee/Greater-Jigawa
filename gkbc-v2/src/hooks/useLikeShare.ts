import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedService } from '../services/supabase/feed';
import { feedKeys } from './queryKeys';
import { useAuth } from '../contexts/AuthContext';

export const useLikeShare = () => {
  const queryClient = useQueryClient();
  const { userProfile } = useAuth();

  const likeMutation = useMutation({
    mutationFn: (postId: string) => feedService.toggleLike(postId, userProfile!.id),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: feedKeys.lists() });

      const previousFeed = queryClient.getQueryData(feedKeys.lists());

      // Optimistic update
      queryClient.setQueryData(feedKeys.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any[]) =>
            page.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    has_liked: !post.has_liked,
                    likes_count: post.has_liked
                      ? post.likes_count - 1
                      : post.likes_count + 1,
                  }
                : post
            )
          ),
        };
      });

      return { previousFeed };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(feedKeys.lists(), context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedKeys.lists() });
    },
  });

  const shareMutation = useMutation({
    mutationFn: (postId: string) => feedService.sharePost(postId, userProfile!.id),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: feedKeys.lists() });

      const previousFeed = queryClient.getQueryData(feedKeys.lists());

      queryClient.setQueryData(feedKeys.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any[]) =>
            page.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    has_shared: !post.has_shared,
                    shares_count: post.has_shared
                      ? post.shares_count - 1
                      : post.shares_count + 1,
                  }
                : post
            )
          ),
        };
      });

      return { previousFeed };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(feedKeys.lists(), context?.previousFeed);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedKeys.lists() });
    },
  });

  return {
    toggleLike: likeMutation.mutateAsync,
    toggleShare: shareMutation.mutateAsync,
  };
};