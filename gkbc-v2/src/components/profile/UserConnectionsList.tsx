import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserPlus, UserCheck } from 'lucide-react';
import { connectionsService } from '../../services/supabase/connections';
import { MemberCard } from '../members/MemberCard';
// import VerifiedBadge from '../VerifiedBadge'; // not used – removed

interface UserConnectionsListProps {
  userId: string;
  viewerId: string;
}

export const UserConnectionsList: React.FC<UserConnectionsListProps> = ({ userId, viewerId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: connections = [], isLoading } = useQuery({
    queryKey: ['user-friends', userId],
    queryFn: () => connectionsService.getFriendsList(userId), // now exists
  });

  const { data: myFriends = [] } = useQuery({
    queryKey: ['friends'],
    queryFn: () => connectionsService.getFriends(),
  });

  const sendRequestMutation = useMutation({
    mutationFn: (targetUserId: string) => connectionsService.sendConnectionRequest(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const getUserInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  if (isLoading) return <div className="text-center py-8">Loading connections...</div>;
  if (connections.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <UserCheck size={24} className="text-gray-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">No connections yet</h3>
        <p className="text-gray-600 text-xs">This user hasn't connected with anyone yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {connections.map((conn: any) => {
        const isAlreadyConnected = myFriends.some((f: any) => f.user_id === conn.user_id);
        const isSelf = conn.user_id === viewerId;
        const connectionButton = isSelf ? null : (
          <button
            disabled={isAlreadyConnected}
            onClick={() => sendRequestMutation.mutate(conn.user_id)}
            className={`w-full py-2 text-xs rounded-lg font-medium min-h-[36px] flex items-center justify-center gap-1 ${
              isAlreadyConnected
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-700'
            }`}
          >
            {isAlreadyConnected ? (
              <>
                <UserCheck size={14} />
                <span>Connected</span>
              </>
            ) : (
              <>
                <UserPlus size={14} />
                <span>Connect</span>
              </>
            )}
          </button>
        );
        return (
          <MemberCard
            key={conn.user_id}
            member={{
              id: conn.user_id,
              first_name: conn.user_name.split(' ')[0],
              last_name: conn.user_name.split(' ').slice(1).join(' '),
              avatar_url: conn.user_avatar,
              business_name: '',
              business_type: '',
              market_area: '',
              location: '',
              bio: '',
              role: '',
              user_status: conn.user_status,
            }}
            connectionButton={connectionButton}
            onProfileClick={(id, e) => {
              if ((e.target as HTMLElement).closest('button')) return;
              navigate(`/profile/${id}`);
            }}
            getUserInitials={getUserInitials}
          />
        );
      })}
    </div>
  );
};