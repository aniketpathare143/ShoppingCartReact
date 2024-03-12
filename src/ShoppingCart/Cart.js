import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../Store/ProductContext';
import { Table, TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Button } from 'semantic-ui-react';

const Cart = () => {
    const navigate = useNavigate();
    const { productCounts, products, setCategoryId, clearShowProductFun } = useProductContext();

    const totalQuantity = Object.values(productCounts).reduce((total, count) => total + count, 0);

    const totalPrice = products.reduce((total, product) => {
        const count = productCounts[product.productId] || 0;
        return total + count * product.price;
    }, 0);

    const handleBackClick = () => {
        setCategoryId('')
        clearShowProductFun();
        navigate('/home');
    };

    const handlePlaceOrder = () => {
        navigate('/placeorder');
    }

    return (
        <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '100px' }}>

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
                            if (product && count > 0) {
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
                        <Table.Cell colSpan='2'>
                            <strong>{totalPrice.toFixed(2)}</strong></Table.Cell>
                    </Table.Row>
                </TableBody>
            </Table>
            <Button onClick={handleBackClick} color='facebook'>Go Back</Button>
            <Button onClick={handlePlaceOrder} color='facebook'>Place Order</Button>
        </div>
    )
}

export default Cart;