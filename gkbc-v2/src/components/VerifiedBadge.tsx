import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: number;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 16 }) => {
  return <CheckCircle size={size} className="text-green-500 fill-current" />;
};

export default VerifiedBadge;