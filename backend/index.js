const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Database
const products = [
    { id: 1, name: "Pro Gaming Mouse", price: 80, category: "Electronics" },
    { id: 2, name: "Mechanical Keyboard", price: 120, category: "Electronics" },
    { id: 3, name: "Ergonomic Chair", price: 250, category: "Office" },
    { id: 4, name: "USB-C Hub", price: 45, category: "Electronics" },
    { id: 5, name: "Standing Desk", price: 450, category: "Office" },
    { id: 6, name: "Coffee Press", price: 30, category: "Kitchen" },
];

// POST API to add a new product
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Generates a simple ID
    products.push(newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// Main Filtered Route
app.get('/api/products', (req, res) => {
    let { category, minPrice, maxPrice, sort } = req.query;
    let filtered = [...products];

    // 1. Filter by Category
    if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
    }

    // 2. Filter by Price Range
    if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));

    // 3. Sort by Price
    if (sort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    res.json(filtered);
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));