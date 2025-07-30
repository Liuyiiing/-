import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './App.css';

const List = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]);
  };

  return (
    <div className="list-container">
      <h2>订单详情</h2>
      {orders.length === 0 ? (
        <p>暂无订单</p>
      ) : (
        <div>
          <button onClick={handleClearOrders} style={{ marginBottom: '20px' }}>
            清空订单
          </button>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <h3>订单编号: {order.id}</h3>
                <p>商品: {order.productName}</p>
                <p>选择的格子: {order.selectedCells.join(', ')}</p>
                <p>时间: {order.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => navigate('/shop')} style={{ marginTop: '20px' }}>
        返回首页
      </button>
    </div>
  );
};

export default List;