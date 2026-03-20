import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div style={{ 
            border: '1px solid #eee', 
            padding: '20px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            backgroundColor: 'white',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
        }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{product.name}</h4>
            <p style={{ color: '#888', margin: '0 0 15px 0', fontSize: '0.9rem' }}>{product.category}</p>
            <b style={{ fontSize: '1.4rem', color: '#2c3e50' }}>${product.price}</b>
        </div>
    );
};

export default ProductCard;
