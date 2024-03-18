import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import { useAuth } from '../Store/AuthContext';

const NavigationBar = () => {
    const { username, isLoggedIn, logout } = useAuth();
    return (
        <div>
            <Menu inverted>
                <Menu.Menu position='left'>
                    <Menu.Item as='a'><Link to="/home">Home</Link></Menu.Item>
                    <Menu.Item as='a'>Address</Menu.Item>
                    <Menu.Item as='a'>Contact</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item as='a'></Menu.Item>
                    <Menu.Item>
                        {isLoggedIn ? <Dropdown item text={`Welcome ${username}`}>
                            <Dropdown.Menu color='facebook'>
                                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/showorder">Show my Orders</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> : (
                            <Link to="/login"><Button color='instagram'>Login</Button></Link>
                        )}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default NavigationBar; 
