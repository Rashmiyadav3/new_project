import React from 'react';

const FilterPanel = ({ filters, updateFilter }) => {
    return (
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select name="category" value={filters.category} onChange={updateFilter} style={styles.input}>
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Office">Office</option>
                <option value="Kitchen">Kitchen</option>
            </select>

            <input name="minPrice" type="number" placeholder="Min $" value={filters.minPrice} onChange={updateFilter} style={styles.input} />
            <input name="maxPrice" type="number" placeholder="Max $" value={filters.maxPrice} onChange={updateFilter} style={styles.input} />

            <select name="sort" value={filters.sort} onChange={updateFilter} style={styles.input}>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    );
};

const styles = {
    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem'
    }
};

export default FilterPanel;
