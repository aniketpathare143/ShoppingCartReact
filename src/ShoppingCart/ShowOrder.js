import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/AuthContext';
import axios from 'axios';
import { Accordion, Button, Grid, Header, HeaderContent, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const initialState = {
    userId: '',
    userName: '',
    retrieveOrders: [
        {
            orderId: '',
            placedAt: '',
            productPlacedCount: 0,
            productPrice: 0,
            retrievePlacedOrders: [
                {
                    placedOrderId: '',
                    categoryName: '',
                    productName: '',
                    placedQuantity: 0
                }
            ]
        }
    ]
}

const ShowOrder = () => {
    const { userId, isLoggedIn } = useAuth();
    const [orders, setOrders] = useState(initialState);
    const [activeIndex, setActiveIndex] = useState(null);
    var val;

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const options = { timeZone: 'Asia/Kolkata' }; // IST time zone
        const formattedDateTime = dateTime.toLocaleString('en-IN', options);

        return formattedDateTime;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5087/api/user/${userId}`);
                console.log("Response is:" + response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClick = async (e, orderId) => {
        e.stopPropagation(); // Stop event propagation to prevent toggling the accordion
        val = window.confirm('Are you sure you want to delete a order?')
        if (val) {
            try {
                const response = await axios.delete(`http://localhost:5087/api/order/${orderId}`);
                console.log(response);
                if (response.status === 200) {
                    // Order deleted successfully, update the orders state to refresh orders
                    setOrders(prevOrders => ({
                        ...prevOrders,
                        retrieveOrders: prevOrders.retrieveOrders.filter(order => order.orderId !== orderId)
                    }));
                    alert('Order Deleted successfully!');
                }
                else {
                    alert('Unable to delete the order.')
                }
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }

    }

    return (
        <div>
            {
                isLoggedIn && orders.retrieveOrders !== null && (
                    <><h2 style={{ color: 'grey' }}>Placed Orders</h2>
                        <Accordion fluid styled style={{ marginBottom: '20px' }}>
                            {
                                orders.retrieveOrders.map((order, index) => (
                                    <React.Fragment key={index}>
                                        <Accordion.Title active={activeIndex === index} index={index}
                                            onClick={() => handleClick(index)}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            <Icon name='dropdown' />
                                            <div style={{ flexGrow: 1 }}>
                                                <div>
                                                    Order Number: {index + 1} <strong>&nbsp;&nbsp; &nbsp;
                                                        Total Products: {order.productPlacedCount} &nbsp;&nbsp; &nbsp;
                                                        Placed on: {formatDateTime(order.placedAt)}</strong> &nbsp;&nbsp; &nbsp;
                                                    Order Total: {order.priceTotal}
                                                </div>
                                            </div>
                                            <Button
                                                color='red'
                                                onClick={(e) => handleDeleteClick(e, order.orderId)}
                                            >Delete</Button>
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === index}>
                                            <Table celled>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>Product Name</Table.HeaderCell>
                                                        <Table.HeaderCell>Category Name</Table.HeaderCell>
                                                        <Table.HeaderCell>Placed Quantity</Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {order.retrievePlacedOrders.map((placedOrder, idx) => (
                                                        <Table.Row key={idx}>
                                                            <Table.Cell>{placedOrder.productName}</Table.Cell>
                                                            <Table.Cell>{placedOrder.categoryName}</Table.Cell>
                                                            <Table.Cell>{placedOrder.placedQuantity}</Table.Cell>
                                                        </Table.Row>
                                                    ))}
                                                </Table.Body>
                                            </Table>
                                        </Accordion.Content>
                                    </React.Fragment>
                                ))
                            }
                        </Accordion></>
                )}
            {isLoggedIn && <Link to='/home'><Button color='facebook'>Go back</Button></Link>}
        </div>
    )
}

export default ShowOrder;
