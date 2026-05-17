'use client';

import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  gold: 'btn-gold',
  ghost: 'btn-ghost',
};

export function ActionButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={`${variantMap[variant]} ${sizeMap[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
