import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, Sidebar, Segment } from 'semantic-ui-react';
import LoginComponent from '../Login/Login';
import Registration from '../Login/Registration';
import Category from '../ShoppingCart/Category';
import Product from '../ShoppingCart/Product';

const HomeComponent = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [categoryId, setCategoryId] = useState('');
    let isCatClicked;
    const [categoryClicked, setCategoryClicked] = useState(false);

    const navigate = useNavigate();

    const [showLoginComponent, setShowLoginComponent] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsSignUp(false);
    }

    const handleLogin = (loginData) => {
        // Assuming authentication logic here
        // For simplicity, just checking if email and password are provided
        if (loginData.email && loginData.password) {
            // Successful login
            setIsLoggedIn(true);
            setUsername(loginData.email); // Assuming email as username for simplicity
        } else {
            // Failed login
            alert('Invalid email or password');
        }
    };

    const handleSignUp = () => {
        setIsSignUp(true);
    };


    const handleSetCategory = (categoryId, categoryClicked) => {
        console.log("In home:" + categoryClicked, categoryId);
        setCategoryId(categoryId);       
        //categoryClicked=true; 
        setCategoryClicked(true);
    };

    const handleRegistration = (registrationData) => {
        // Assuming registration logic here
        // For simplicity, just logging the registration data
        console.log('Registration data:', registrationData);
        setIsLoggedIn(true);
        setUsername(registrationData.email); // Assuming email as username for simplicity
    };
    
    return (
        <div>
            <Sidebar.Pushable as={Segment}>
                <Sidebar.Pusher>
                    <Segment basic>
                        <Menu inverted>
                            <Menu.Menu position='left'>
                                <Menu.Item as='a'>Home</Menu.Item>
                                <Menu.Item as='a'>Address</Menu.Item>
                                <Menu.Item as='a'>Contact</Menu.Item>
                            </Menu.Menu>
                            <Menu.Menu position='right'>
                                <Menu.Item as='a'></Menu.Item>
                                <Menu.Item>
                                    {isLoggedIn ? (
                                        <div>
                                            <span>Welcome {username}</span> &nbsp;&nbsp;
                                            <Button onClick={handleLogout} color='instagram'>Logout</Button>
                                        </div>
                                    ) : (
                                        isSignUp ? null : <Button color='instagram'>Login</Button>
                                    )}
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            <div style={{ display: 'flex' }}>
                {
                    isLoggedIn ? <Category onSet={handleSetCategory} /> : (
                        isSignUp ? (
                            <Registration onRegistration={handleRegistration} />
                        ) : (
                            <LoginComponent onLogin={handleLogin} onSignUp={handleSignUp} />
                        )
                    )
                }                
                {
                    isLoggedIn && categoryClicked ?
                        <div style={{ marginLeft: '20px' }}>
                            <Product catId={categoryId} />
                        </div> : null
                }
            </div>
        </div>
    );
};

export default HomeComponent;
