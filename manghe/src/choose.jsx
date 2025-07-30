import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './App.css';

const Choose = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedCells, setSelectedCells] = useState([]);

  const cells = Array.from({ length: 9 }, (_, i) => i + 1);

  const handleCellClick = (cellNumber) => {
    if (selectedCells.includes(cellNumber)) {
      setSelectedCells(selectedCells.filter(num => num !== cellNumber));
    } else {
      setSelectedCells([...selectedCells, cellNumber]);
    }
  };

  const handleConfirm = () => {
    if (selectedCells.length === 0) {
      alert('请至少选择一个格子');
      return;
    }

    // 获取现有订单
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // 添加新订单
    const newOrder = {
      id: Date.now(),
      productId: productId,
      productName: `盲盒${productId}`,
      selectedCells: selectedCells,
      timestamp: new Date().toLocaleString()
    };
    
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // 跳转到订单详情页面
    navigate('/list');
  };

  return (
    <div className="choose-container">
      <h2>盲盒{productId}选购页面</h2>
      <div className="grid-container">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`grid-cell ${selectedCells.includes(cell) ? 'selected' : ''}`}
            onClick={() => handleCellClick(cell)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="selected-info">
        已选择: {selectedCells.join(', ') || '无'}
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        确认选择
      </button>
    </div>
  );
};

export default Choose;