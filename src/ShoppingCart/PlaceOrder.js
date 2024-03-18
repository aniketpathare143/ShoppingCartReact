import React, { useEffect } from 'react'
import { useProductContext } from '../Store/ProductContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/AuthContext';

const PlaceOrder = () => {

    const { productCounts, clearProductCounts, products } = useProductContext();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const updatedPlacedOrders = () => {
        console.log("In here")
        const placedOrders = [];

        // Convert productCounts object to an array of objects
        for (const [productId, count] of Object.entries(productCounts)) {
            const product = products.find(p => p.productId === productId);
            console.log("Inside here")
            // Push the new object into the placedOrders array
            placedOrders.push({
                placedQuantity: count,
                categoryId: product.categoryId,
                productId: productId
            });
        }

        return placedOrders;
    }

    useEffect(() => {
        const ordersList = {
            userId: userId,
            placedOrders: updatedPlacedOrders()
        };
        try {
            const response = axios.post('http://localhost:5087/api/order', ordersList);
            console.log(response);
            clearProductCounts();
            alert('Order placed successfully:');
            navigate('/home');

        } catch (error) {
            console.error('Error placing order:', error);
        }

    }, [productCounts])

    return (
        <div>
        </div>
    )
}

export default PlaceOrder;