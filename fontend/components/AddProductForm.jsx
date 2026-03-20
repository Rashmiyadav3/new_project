import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Electronics');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price) return;
        
        try {
            await axios.post('http://localhost:5000/api/products', {
                name,
                price: Number(price),
                category
            });
            
            // clear form
            setName('');
            setPrice('');
            setCategory('Electronics');
            
            // tell parent to refresh
            if (onProductAdded) {
                onProductAdded();
            }
        } catch (error) {
            console.error('Failed to add product', error);
            alert('Error adding product. Is backend running?');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ 
            display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap',
            padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px',
            border: '1px solid #e9ecef', marginBottom: '30px'
        }}>
            <h4 style={{ margin: 0, color: '#495057' }}>Add New Product:</h4>
            
            <input 
                type="text" 
                placeholder="Product Name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                style={styles.input} 
                required 
            />
            
            <input 
                type="number" 
                placeholder="Price $" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                style={{ ...styles.input, width: '100px' }} 
                required 
            />
            
            <select 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                style={styles.input}
            >
                <option value="Electronics">Electronics</option>
                <option value="Office">Office</option>
                <option value="Kitchen">Kitchen</option>
            </select>
            
            <button type="submit" style={styles.button}>
                + Add Product
            </button>
        </form>
    );
};

const styles = {
    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        fontSize: '1rem'
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#0d6efd',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem'
    }
};

export default AddProductForm;
