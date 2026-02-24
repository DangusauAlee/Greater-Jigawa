import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

interface RequireAdminProps {
  children: ReactNode;
}

export const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: isAdmin, isLoading, error } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_admin');
      if (error) throw error;
      return data as boolean;
    },
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !error && isAdmin === false) {
      // Redirect to admin login, preserving the intended destination
      navigate(`/admin/login?returnTo=${encodeURIComponent(location.pathname)}`);
    }
  }, [isAdmin, isLoading, error, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !isAdmin) {
    return null; // will redirect via useEffect
  }

  return <>{children}</>;
};