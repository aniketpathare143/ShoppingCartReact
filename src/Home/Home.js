import Category from '../ShoppingCart/Category';
import { useAuth } from '../Store/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {
                    isLoggedIn ? <Category /> : navigate('/login')
                }
            </div>
        </div>
    );
};

export default HomeComponent;
