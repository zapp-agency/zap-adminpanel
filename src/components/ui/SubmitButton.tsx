import React from 'react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children = 'Submit', ...props }) => {
  return (
    <button type="submit" {...props}>
      {children}
    </button>
  );
};

export default SubmitButton;
