import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Product = (props) => {
    const [product, setProducts] = useState([]);
    //const { categoryId } = useParams();
    //console.log("Props.id:-"+props.catId);    
    //const categoryId='E0D7B4B6-B572-4485-9ADC-08DC4001E11B';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5087/api/product/${props.catId}`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [props.catId]);

    return (
        <div>
            {
                product.map((item) => (
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ marginRight: '30px' }} class="ui card">
                            <div class="image">
                                <img src={'data:image/jpeg;base64,' + item.productImage}
                                    style={{ width: '200px', height: '150px' }} />
                            </div>
                            <div class="content">
                                <a class="header">{item.productName}</a>
                                <div class="meta">
                                    <span class="date">Available Qty - {item.availableQuantity}</span>
                                </div>
                                <div class="description">
                                    This product name is: {item.productName}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Product;