import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/dashboard');
    };
    return (
        <div>
            <div className="login-container">
                <img
                    src={require('../../assets/company-logo.png')}
                    alt="Company Logo"
                    className="company-logo"
                />
                <h1 className="login-heading">Welcome to PolicyHub!👋</h1>
                <p className="login-subheading">An internal search engine for Lewer!</p>
                <button className="ms-button" type="button" onClick={handleLogin}>
                    <span>Sign in with Microsoft</span>
                    <span className="ms-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#F25022" d="M1 1h10v10H1z" />
                            <path fill="#7FBA00" d="M13 1h10v10H13z" />
                            <path fill="#00A4EF" d="M1 13h10v10H1z" />
                            <path fill="#FFB900" d="M13 13h10v10H13z" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Login;