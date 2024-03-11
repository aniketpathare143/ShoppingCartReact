import React, { useState } from 'react'
import { createContext, useContext } from "react";
import { useProductContext } from '../Store/ProductContext';
import {
    Table, TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Button,
} from 'semantic-ui-react';
const Cart = (props) => {
    const { productCounts, products } = useProductContext();
    console.log(products);
    console.log("ProductCounts:" + productCounts);
    const totalQuantity = Object.values(productCounts).reduce((total, count) => total + count, 0);

    const totalProductPrice = products.reduce((total, product) => total + product.price, 0);

    const totalPrice = products.reduce((total, product) => {
      const count = productCounts[product.productId] || 0;
      return total + count * product.price;
    }, 0);

    const handleBackClick = () => {
        props.setButtonGoBackClicked(true); // Update the flag in the parent component
        props.handleBackClick(); // Call the parent's function
      };

    return (
        <div style={{ marginLeft: '300px',marginTop:'100px' }}>
            {/* <h2>Cart</h2>
            <ul>
                {Object.entries(productCounts).map(([productId, count]) => (
                    <li key={productId}>
                        Product ID: {productId}, Count: {count}
                    </li>
                ))}
            </ul> */}

            <Table sortable celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Product Name</TableHeaderCell>
                        <TableHeaderCell>Quantity</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Total</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        Object.entries(productCounts).map(([productId, count]) => {
                            // Find the product with matching productId
                            const product = products.find(product => product.productId === productId);

                            // If product is found
                            if (product) {
                                return (
                                    <TableRow key={productId}>
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{count}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.price * count}</TableCell>
                                       
                                    </TableRow>
                                );
                            } else {
                                return null; // Handle case when product is not found
                            }
                        })
                    }
                    <Table.Row>
                        <Table.Cell><strong>Total</strong></Table.Cell>
                        <Table.Cell><strong>{totalQuantity}</strong></Table.Cell>
                        <Table.Cell><strong>{totalProductPrice}</strong></Table.Cell>
                        <Table.Cell><strong>{totalPrice.toFixed(2)}</strong></Table.Cell>
                    </Table.Row>
                </TableBody>
            </Table>
            <Button onClick={handleBackClick} color='facebook'>Go Back</Button>
        </div>
    )
}

export default Cart;