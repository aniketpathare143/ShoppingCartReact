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
        const placedOrders = [];
        // Convert productCounts object to an array of objects
        for (const [productId, count] of Object.entries(productCounts)) {
            if (count > 0) {
                const product = products.find(p => p.productId === productId);

                // Push the new object into the placedOrders array
                placedOrders.push({
                    placedQuantity: count,
                    categoryId: product.categoryId,
                    productId: productId
                });
            }
        }

        return placedOrders;
    }

    useEffect(() => {
        const placeOrder = async () => {
            const ordersList = {
                userId: userId,
                placedOrders: updatedPlacedOrders()
            };
            try {
                const response = await axios.post('http://localhost:5087/api/order', ordersList);
                console.log(response);
                clearProductCounts();
                alert('Order placed successfully:');
                navigate('/showorder');

            } catch (error) {
                console.error('Error placing order:', error);
            }
        };
        placeOrder();
    }, [productCounts])

    return (
        <div>
        </div>
    )
}

export default PlaceOrder;