import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { useProductContext } from '../Store/ProductContext';
import Product from './Product';

const Category = () => {
    const [category, setCategory] = useState([]);
    const { setProductsInContext, showProduct, setShowProductFun, categoryId, setCategoryId } = useProductContext();
    
    const handleCategoryClick = (e) => {
        setCategoryId(e);
        setShowProductFun();
    };

    useEffect(() => {        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5087/api/category');
                setCategory(response.data);              
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchData1 = async () => {
            try {
                const response = await axios.get('http://localhost:5087/api/product');                
                setProductsInContext(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        fetchData1();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Menu vertical style={{ marginRight: '20px' }}>
                    <Menu.Item header>Categories</Menu.Item>
                    {
                        category.map((item) => (
                            <>
                                <Menu.Item value={item.categoryId} onClick={() => handleCategoryClick(item.categoryId)} name={item.categoryName} active={false}>{item.categoryName}</Menu.Item>
                            </>
                        ))
                    }
                </Menu>
                <div>
                    {showProduct && <Product catId={categoryId} />}
                </div>
            </div>
        </div>
    )
}

export default Category;