import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Get current language t function
  const getT = () => (window as any).__i18n?.t || ((key: string) => key);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Show toast notification
    const duration = notification.duration || 4000;
    
    switch (notification.type) {
      case 'success':
        toast.success(notification.title, {
          description: notification.message,
          duration,
          action: notification.action ? {
            label: notification.action.label,
            onClick: notification.action.onClick
          } : undefined
        });
        break;
      case 'error':
        toast.error(notification.title, {
          description: notification.message,
          duration: duration * 2, // Errors stay longer
          action: notification.action ? {
            label: notification.action.label,
            onClick: notification.action.onClick
          } : undefined
        });
        break;
      case 'warning':
        toast.warning(notification.title, {
          description: notification.message,
          duration,
          action: notification.action ? {
            label: notification.action.label,
            onClick: notification.action.onClick
          } : undefined
        });
        break;
      case 'info':
        toast.info(notification.title, {
          description: notification.message,
          duration,
          action: notification.action ? {
            label: notification.action.label,
            onClick: notification.action.onClick
          } : undefined
        });
        break;
    }

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const success = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message });
  };

  const warning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Predefined notification templates for common actions
export const notificationTemplates = {
  cart: {
    added: (productName: string) => ({
      type: 'success' as const,
      title: 'Added to Cart',
      message: `${productName} has been added to your cart`
    }),
    removed: () => ({
      type: 'info' as const,
      title: 'Item Removed',
      message: 'Item has been removed from your cart'
    }),
    cleared: () => ({
      type: 'info' as const,
      title: 'Cart Cleared',
      message: 'All items have been removed from your cart'
    }),
    promoApplied: (discount: number) => ({
      type: 'success' as const,
      title: 'Promo Code Applied',
      message: `You saved ₹${discount.toFixed(2)}!`
    }),
    promoInvalid: () => ({
      type: 'error' as const,
      title: 'Invalid Promo Code',
      message: 'Please check the code and try again'
    })
  },
  booking: {
    confirmed: () => ({
      type: 'success' as const,
      title: 'Booking Confirmed',
      message: 'Your experience has been booked successfully'
    }),
    cancelled: () => ({
      type: 'warning' as const,
      title: 'Booking Cancelled',
      message: 'Your booking has been cancelled'
    }),
    failed: () => ({
      type: 'error' as const,
      title: 'Booking Failed',
      message: 'Please try again or contact support'
    })
  },
  contact: {
    sent: () => ({
      type: 'success' as const,
      title: 'Message Sent',
      message: 'Thank you! We\'ll get back to you soon'
    }),
    failed: () => ({
      type: 'error' as const,
      title: 'Message Failed',
      message: 'Please try again or contact us directly'
    })
  },
  auth: {
    loginSuccess: () => ({
      type: 'success' as const,
      title: 'Welcome Back',
      message: 'You have been logged in successfully'
    }),
    logoutSuccess: () => ({
      type: 'info' as const,
      title: 'Logged Out',
      message: 'You have been logged out successfully'
    }),
    signupSuccess: () => ({
      type: 'success' as const,
      title: 'Account Created',
      message: 'Welcome to Roots & Routes!'
    }),
    invalidCredentials: () => ({
      type: 'error' as const,
      title: 'Invalid Credentials',
      message: 'Please check your email and password'
    })
  },
  network: {
    offline: () => ({
      type: 'warning' as const,
      title: 'Connection Lost',
      message: 'Please check your internet connection'
    }),
    online: () => ({
      type: 'success' as const,
      title: 'Connection Restored',
      message: 'You are back online'
    }),
    error: () => ({
      type: 'error' as const,
      title: 'Network Error',
      message: 'Failed to connect to server'
    })
  }
};
