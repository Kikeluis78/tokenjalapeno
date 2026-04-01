import { ReactNode } from 'react';

interface CenteredButtonProps {
  children: ReactNode;
}

export const CenteredButton = ({ children }: CenteredButtonProps) => {
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
};
