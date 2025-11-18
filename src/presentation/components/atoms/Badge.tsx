import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

/**
 * Atom: Badge
 * Componente básico para mostrar etiquetas o estados
 * 
 * Principio SRP: Responsabilidad única de mostrar un badge
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-gray-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600',
  };

  const sizeClasses = {
    sm: 'px-1.5 py-0.5',
    md: 'px-2 py-1',
  };

  const textSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
  };

  return (
    <View
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded ${className}`}
      {...props}
    >
      <Text className={`${textSizeClasses[size]} font-bold text-white`}>
        {children}
      </Text>
    </View>
  );
};

