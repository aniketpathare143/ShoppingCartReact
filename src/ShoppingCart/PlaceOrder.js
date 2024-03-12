import React, { useEffect } from 'react'
import { useProductContext } from '../Store/ProductContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/AuthContext';

const PlaceOrder = () => {
    const { productCounts, clearProductCounts } = useProductContext();
    const { userId } = useAuth();
    const navigate = useNavigate();
    console.log("UserId:" + userId);

    // useEffect to update orderData whenever productCounts changes
    useEffect(() => {
        // Convert productCounts object to an array of objects with productId and count
        const productCountsArray = Object.entries(productCounts).map(([productId, count]) => ({
            ProductId: productId,
            PlacedQuantity: count,
            UserId: userId
        }));

        // Update orderData with the new array of products       
        console.log(productCountsArray);
        try {
            const response = axios.post('http://localhost:5087/api/order', productCountsArray);
            console.log(response);
            clearProductCounts();
            alert('Order placed successfully:');
            navigate('/home');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }, [productCounts]);


    return (
        <div>
        </div>
    )
}

export default PlaceOrder;