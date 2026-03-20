import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from './components/FilterPanel';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';

const App = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: 'All',
        minPrice: '',
        maxPrice: '',
        sort: 'asc'
    });

    // Fetching logic - triggers whenever 'filters' state changes
    useEffect(() => {
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: filters, // Axios automatically converts this to ?category=...&minPrice=...
                    signal: controller.signal
                });
                setProducts(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request cancelled due to rapid filtering");
                } else {
                    console.error("Error fetching products", err);
                }
            }
        };
        getProducts();

        return () => controller.abort();
    }, [filters]);

    const updateFilter = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
            <h2>Product Catalog</h2>

            {/* Form to add a new Product */}
            <AddProductForm onProductAdded={() => setFilters({...filters})} />

            {/* Control Panel */}
            <FilterPanel filters={filters} updateFilter={updateFilter} />

            {/* Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
                {products.length > 0 ? products.map(p => (
                    <ProductCard key={p.id} product={p} />
                )) : <p style={{ gridColumn: '1 / -1', textAlign: 'center', margin: '40px 0', color: '#888' }}>No products found matching these filters.</p>}
            </div>
        </div>
    );
};

export default App;