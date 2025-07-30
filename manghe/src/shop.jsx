import './App.css';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';

const Shop = () => {
  // 创建6个商品数据
  const products = [
    { id: 1, name: '盲盒1', image: '/good1.jpeg' },
    { id: 2, name: '盲盒2', image: '/good2.jpg' },
    { id: 3, name: '盲盒3', image: '/good3.jpg' },
    { id: 4, name: '盲盒4', image: '/good4.jpeg' },
    { id: 5, name: '盲盒5', image: '/good5.jpeg' },
    { id: 6, name: '盲盒6', image: '/good6.png' },
  ];

  const navigate = useNavigate();
  // 添加搜索关键字状态
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductClick = (productId) => {
    navigate(`/choose/${productId}`);
  };

  const handleViewOrders = () => {
    navigate('/list');
  };

  // 根据搜索关键字过滤商品
  const filteredProducts = products.filter(product => 
    product.name.includes(searchTerm)
  );

   return (
    <div className="shop-container">
      <h1>商品展示</h1>
      {/* 添加搜索框 */}
      <div style={{ margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="搜索商品..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ 
            padding: '8px', 
            width: '300px', 
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <div style={{ marginTop: '30px' }}>
        <button onClick={handleViewOrders} className="confirm-button">
          查看订单详情
        </button>
      </div>
      <br />
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <h3 onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer', color: 'blue' }}>
              {product.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;