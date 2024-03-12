import { useState } from "react";
import { Button, Form, Input, LabelDetail } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/AuthContext';
import axios from "axios";

const LoginComponent = () => {

    const { login } = useAuth();

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:5087/api/login/${loginData.email}/${loginData.password}`);
            console.log("UserId:" + response.data.userId);
            if (response.data) {
                login(response.data.firstName, response.data.userId);
                navigate('/home');
            }
            else {
                alert('Invalid email or password');
            }
        } catch (error) {

        }
    };

    const handleSignUp = () => {
        navigate('/registration');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <div class="page-login">
            <div class="ui centered grid container">
                <div class="nine wide column">
                    <div class="ui fluid card">
                        <div class="content">
                            <Form class="ui form" onSubmit={handleLogin}>
                                <div class="field">
                                    <LabelDetail>Email</LabelDetail>
                                    <Input type="text" name="email" value={loginData.email} onChange={handleInputChange} placeholder="Email" />
                                </div>
                                <div class="field">
                                    <LabelDetail>Password</LabelDetail>
                                    <Input type="password" name="password" value={loginData.password} onChange={handleInputChange} placeholder="Password" />
                                </div>
                                <Button color="instagram" class="ui primary labeled icon button" type="submit">
                                    <i class="unlock alternate icon"></i>
                                    SignIn
                                </Button>
                                <label class="right-aligned-label">New User ?</label>
                                <Button color="facebook" floated="right" class="ui primary labeled icon button" type="submit"
                                    onClick={handleSignUp}
                                >
                                    <i class="lock alternate icon"></i>
                                    SignUp
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;