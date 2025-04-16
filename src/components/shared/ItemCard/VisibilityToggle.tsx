
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisibilityToggleProps {
  visible: boolean;
  onChange?: (visible: boolean) => void;
  className?: string;
}

const VisibilityToggle = ({ visible, onChange, className }: VisibilityToggleProps) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(!visible);
    }
  };

  return (
    <div 
      className={cn(
        "absolute top-2 left-2 z-10 p-1.5 rounded-full transition-colors cursor-pointer",
        visible ? "bg-thrift-sage/70 text-white" : "bg-thrift-charcoal/70 text-white",
        className
      )}
      onClick={handleToggle}
      title={visible ? "Item is visible to customers" : "Item is hidden from customers"}
    >
      {visible ? (
        <Eye className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
    </div>
  );
};

export default VisibilityToggle;
