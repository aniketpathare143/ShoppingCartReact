import { useState, useEffect } from "react";
import { Button, Form, Input, LabelDetail } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ onLogin, onSignUp }) => {
    const [correct, setCorrect] = useState(false);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCorrect(true);
                //console.log("correct");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [correct]);

    const handleLogin = () => {
       // console.log("u:" + loginData.email + "p:" + loginData.password);
        // Assuming validation and authentication logic here
        // For simplicity, just passing loginData to the onLogin function
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 3000)

        // if (loginData.email === 'sai' && loginData.password === 'sai') {
        //     onLogin(loginData);
        // }

        onLogin(loginData);
    };

    const handleSignUp = () => {
        onSignUp();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        // console.log(loginData)
    };

    return (
        <div class="page-login">
            <div class="ui centered grid container">
                <div class="nine wide column">
                    {
                        loading &&
                        <div class="ui icon warning message">
                            <i class="lock icon"></i>
                            {
                                <div class="content">
                                    <div class="header">
                                        Login failed!
                                    </div>
                                    <p>You might have misspelled your username or password!</p>
                                </div>
                            }
                        </div>
                    }

                    {loading && <div>Verifying please wait...</div>}
                    <div class="ui fluid card">
                        <div class="content">
                            <Form class="ui form" onSubmit={handleLogin}>
                                <div class="field">
                                    <LabelDetail>Email</LabelDetail>
                                    <Input type="text" name="email" value={loginData.email}  onChange={handleInputChange} placeholder="Email" />
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