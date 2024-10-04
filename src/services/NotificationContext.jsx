import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://jackpot-backend.vercel.app/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    fetchNotifications();
  }, []);

  const addNotification = async (notification) => {
    try {
      const response = await fetch('https://jackpot-backend.vercel.app/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      const newNotification = await response.json();
      setNotifications([...notifications, newNotification]);
    } catch (error) {
      console.error('Error al agregar la notificación:', error);
    }
  };

  const removeNotification = async (id) => {
    try {
      await fetch(`https://jackpot-backend.vercel.app/api/notifications/${id}`, {
        method: 'DELETE',
      });

      const updatedNotifications = notifications.filter(
        (notif) => notif.id !== id,
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error al eliminar la notificación:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
