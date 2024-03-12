import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Input, Label, Popup } from 'semantic-ui-react';
import { useProductContext } from '../Store/ProductContext';
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
    const navigate = useNavigate();
    const [product, setProducts] = useState([]);
    const { productCounts, incrementCount, decrementCount } = useProductContext();

    const handleButtonClick = () => {
        navigate('/cart');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5087/api/product/${props.catId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [props.catId]);

    return (
        <div>
            <Button style={{ marginTop: '10px' }} onClick={handleButtonClick} floated='right' className='facebook'>Go to Cart</Button>
            {
                product.map((item) => (
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ marginRight: '40px' }} class="ui card">
                            <div class="image">
                                <img src={'data:image/jpeg;base64,' + item.productImage}
                                    style={{ width: '290px', height: '150px' }} />
                            </div>
                            <div class="content">
                                <a class="header">{item.productName}</a>
                                <div class="meta">
                                    {
                                        item.availableQuantity > 0 ?
                                            <span class="date">Available Qty - {item.availableQuantity}</span>
                                            :
                                            <span class="date"><Label color='red'>Out Of Stock</Label></span>
                                    }
                                </div>
                                <div class="description">
                                    Available at Price {item.price}
                                </div>
                            </div>
                        </div>
                        <Popup position='bottom left'
                            content='Remove From Cart'
                            trigger={
                                item.availableQuantity == 0 ?
                                    <Button onClick={() => decrementCount(item.productId)} color='teal' disabled >-</Button>
                                    : <Button onClick={() => decrementCount(item.productId)} color='teal' >-</Button>
                            }
                        />
                        <Input type="text" value={productCounts[item.productId] || 0} readOnly />
                        <Popup position='bottom left'
                            content='Add To Cart'
                            trigger={
                                item.availableQuantity == 0 ?
                                    <Button onClick={() => incrementCount(item.productId)} style={{ marginLeft: '13px' }} color='orange' disabled>+</Button>
                                    : <Button onClick={() => incrementCount(item.productId)} style={{ marginLeft: '13px' }} color='orange'>+</Button>
                            }
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Product;