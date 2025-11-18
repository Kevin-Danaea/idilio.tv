import React from 'react';
import { Pressable, Text, PressableProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Atom: Button
 * Componente básico de botón reutilizable
 * 
 * Principio SRP: Responsabilidad única de renderizar un botón
 * Principio OCP: Extensible mediante props sin modificar el componente
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-lg flex-row items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-brand-600',
    secondary: 'bg-white/10 border border-white/20',
    ghost: 'bg-transparent',
  };

  const sizeClasses = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        opacity: (disabled || loading) ? 0.5 : pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : '#e11d48'} />
      ) : (
        <Text className={`font-bold ${variant === 'primary' ? 'text-white' : 'text-white'}`}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

