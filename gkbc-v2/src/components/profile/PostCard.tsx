import React from 'react';
import { Trash2 } from 'lucide-react';
import VerifiedBadge from '../VerifiedBadge';
import { formatTimeAgo } from '../../utils/formatters';

interface PostCardProps {
  post: any;
  isOwner: boolean;
  onDelete: () => void;
  isVerified: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isOwner, onDelete, isVerified }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden border border-blue-200">
              {post.author_avatar_url ? (
                <img src={post.author_avatar_url} alt={post.author_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm font-bold">
                  {post.author_name?.charAt(0)}
                </div>
              )}
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 z-10">
                  <VerifiedBadge size={8} />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-gray-900">{post.author_name}</h4>
                {isVerified && <VerifiedBadge size={8} />}
              </div>
              <p className="text-xs text-gray-500">{formatTimeAgo(post.created_at)}</p>
            </div>
          </div>
          {isOwner && (
            <button
              onClick={onDelete}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full border border-gray-200"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
        {post.content && <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-3">{post.content}</p>}
        {post.media_urls?.[0] && (
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <img src={post.media_urls[0]} alt="Post media" className="w-full h-48 object-cover" loading="lazy" />
          </div>
        )}
      </div>
    </div>
  );
};