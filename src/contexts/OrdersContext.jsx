import React, { createContext, useState, useContext } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Añade una orden y por defecto nace como "pending"
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      status: 'pending' // pending -> preparing -> ready -> delivered
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  // Mueve la orden entre las columnas actualizando su status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};
