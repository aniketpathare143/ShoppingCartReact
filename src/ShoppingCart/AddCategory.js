import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormField, Input, Label } from 'semantic-ui-react';
import { useAuth } from '../Store/AuthContext';

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleClick = () => {
        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append("CategoryName", categoryName);
            formDataWithImage.append("file", image);

            const result = axios.post('http://localhost:5087/api/category', formDataWithImage, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert('Category added successfully!');
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
        < div className='ui container' style={{ marginTop: '50px' }}>
            <div class="ui container">
                <h2 class="left-aligned-label" >
                    Add New Category
                </h2>
                <br></br>
            </div>
            {
                isLoggedIn &&
                <Form className='ui container form' onSubmit={handleClick}>
                    <FormField>
                        <label>Category Name</label>
                        <Input type='text' name='categoryName' onChange={(e) => setCategoryName(e.target.value)} value={categoryName}></Input>
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

export default AddCategory;
