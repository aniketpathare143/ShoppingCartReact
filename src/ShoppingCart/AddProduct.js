import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Form, FormField, Input, Label } from 'semantic-ui-react';
import { useAuth } from '../Store/AuthContext';
import Category from './Category';

const initialState = {
    ProductName: '',
    AvailableQuantity: 0,
    Price: 0
}
const AddProduct = () => {
    const [categoriesInDropdown, setCategoriesInDropdown] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productData, setProductData] = useState(initialState);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5087/api/category');
                setCategoriesInDropdown(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //here event param is necessary it won't get selected value without event param here
    const handleDropDownChange = (event, data) => {
        setSelectedCategory(data.value);
    };

    const handleClick = async () => {
        try {            
            const formDataWithImage = new FormData();
            formDataWithImage.append("ProductName", productData.ProductName);
            formDataWithImage.append("AvailableQuantity", productData.AvailableQuantity);
            formDataWithImage.append("Price", productData.Price);
            formDataWithImage.append("CategoryId", selectedCategory);
            formDataWithImage.append("file", image);
            console.log(formDataWithImage);

            const result = await axios.post('http://localhost:5087/api/product', formDataWithImage, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert('Product added successfully!');
            navigate('/home');
        } catch (error) {
            console.log("error");
        }
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    return (
        <div className='ui container' style={{ marginTop: '50px' }}>
            {
                isLoggedIn &&
                <div class="ui container">
                    <h2 class="left-aligned-label" >
                        Add New Product 
                    </h2>
                    <br></br>
                </div>
            }
            {
                isLoggedIn &&
                <Form className='ui container form' onSubmit={handleClick}>
                    <FormField>
                        <label>Product Name</label>
                        <Input type='text' name='ProductName' onChange={handleChange} value={productData.ProductName}></Input>
                    </FormField>
                    <Dropdown placeholder='Select Category'
                        icon='angle down'
                        fluid
                        selection
                        options={
                            categoriesInDropdown.map(category => ({
                                key: category.categoryId,
                                text: category.categoryName,
                                value: category.categoryId,
                                categoryName: category.categoryName,
                                categoryId: category.categoryId
                            }))}
                        onChange={handleDropDownChange}
                        value={selectedCategory}
                    >
                    </Dropdown>
                    <FormField>
                        <label>Available Quantity</label>
                        <Input type='text' name='AvailableQuantity' onChange={handleChange} value={productData.AvailableQuantity}></Input>
                    </FormField>
                    <FormField>
                        <label>Price</label>
                        <Input type='text' name='Price' onChange={handleChange} value={productData.Price}></Input>
                    </FormField>
                    <FormField>
                        <label>Upload Photo: <i class="cloud upload icon"></i> </label>
                        <input type='file' name="image" accept="image/*" onChange={handleImageChange}></input>
                    </FormField>
                    <Button color='facebook' type='submit'>Submit</Button>
                </Form>
            }
        </div >
    )
}

export default AddProduct;
