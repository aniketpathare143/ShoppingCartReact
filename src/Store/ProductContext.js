import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productCounts, setProductCounts] = useState({});
    const [products, setProducts] = useState([]);
    const [showProduct, setShowProducts] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    const setShowProductFun = () => {
        setShowProducts(true);
    };

    const clearShowProductFun = () => {
        setShowProducts(false);
    };

    const incrementCount = (productId) => {
        console.log("Product Id:" + productId)
        setProductCounts(prevCounts => ({
            ...prevCounts,
            [productId]: (prevCounts[productId] || 0) + 1
        }));
        console.log("Product Count for ID:" + productCounts[productId])
        console.log("All products:" + productCounts)
    };

    const decrementCount = (productId) => {
        setProductCounts(prevCounts => ({
            ...prevCounts,
            [productId]: Math.max((prevCounts[productId] || 0) - 1, 0)
        }));
    };

    const setProductsInContext = (products) => {
        setProducts(products);
    };

    const clearProductCounts = () => {
        setProductCounts({});
    };

    return (
        <ProductContext.Provider value={{
            productCounts, incrementCount, decrementCount, clearProductCounts,
            setProductsInContext, products,
            showProduct, setShowProductFun, clearShowProductFun, categoryId, setCategoryId
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
