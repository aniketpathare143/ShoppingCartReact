import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Message, FormField, Input } from 'semantic-ui-react';
import { useAuth } from '../Store/AuthContext'

const Registration = () => {
    const { login } = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        DOB: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic form validation
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.DOB.trim()) {
            newErrors.DOB = 'Date of Birth is required';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                console.log("FormData:-" + formData.dateOfBirth);
                const response = await axios.post('http://localhost:5087/api/login/register', formData);
                console.log('User registered successfully:', response.data);
                login(formData.firstName, response.data);
                navigate('/home')
            } catch (error) {
                console.error('Error adding user:', error);                
            }
        }
    };

    return (
        <div className='page-registration'>
            <br></br>
            <div class="ui container">
                <h2 class="left-aligned-label" >
                    Register New User
                </h2>
                <br></br>
            </div>
            <Form className="ui container form" onSubmit={handleSubmit} error={Object.keys(errors).length > 0}>
                <FormField width={10}>
                    <label class="left-aligned-label">First Name:</label>
                    <Input type="Text" name='firstName' value={formData.firstName} onChange={handleChange} error={errors.firstName}></Input><br></br>
                </FormField>

                <FormField width={10}><label class="left-aligned-label">Last Name:</label><Input type="Text" name='lastName' value={formData.lastName} onChange={handleChange} error={errors.lastName}></Input><br></br></FormField>

                <FormField width={10}><label class="left-aligned-label">Email:</label><Input type="Text" name='email' value={formData.email} onChange={handleChange} error={errors.email}></Input><br></br></FormField>

                <FormField width={3}><label class="left-aligned-label">Date Of Birth:</label><Input type="Date" name='DOB' value={formData.DOB} onChange={handleChange} error={errors.DOB}></Input><br></br></FormField>

                <FormField width={10}><label class="left-aligned-label">Password:</label><Input type="Password" name='password' value={formData.password} onChange={handleChange} error={errors.password}></Input><br></br></FormField>

                <FormField width={10}><label class="left-aligned-label">Confirm Password:</label><Input type="Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword}></Input><br></br></FormField>

                <FormField width={10}><label class="left-aligned-label">Address:</label><Input type="TextArea" name='address' value={formData.address} onChange={handleChange} error={errors.address}></Input><br></br></FormField>

                <Message
                    error
                    header="Validation Error"
                    list={Object.values(errors)}
                />
                <Button floated='left' type="Submit" content="Submit" primary></Button>
                <Link to='/login'><Button floated='left' type="Submit" content="Submit" primary>Back</Button></Link>
            </Form>
        </div>
    )
}


export default Registration;
