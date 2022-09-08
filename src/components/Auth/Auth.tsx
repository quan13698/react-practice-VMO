import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(AuthContext); 
    const submitHandler = (e: any) => {
        e.preventDefault()
        context.onLogin('123','123')
        
        
    }
    const navigate = useNavigate();
    const navigateToDashBoard = () => {
        navigate('/dashboard')
    }
    const navigateToRegister = () => {
        navigate('/register')
    }
    return (
        <div className="containerr">
            <div className="auth-form-container">
                <div className="auth-title">
                    <h1>WELCOME TO BAELDUNG</h1>
                </div>
                <div className="auth-form">
                    <div className="sub-title">Log in</div>
                    <div className="form-input">
                        <div className="user-name-input-div">
                            <div className="user-name-label"><h6>Enter UserName:</h6></div>
                            <div className="user-name-input">
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="password-input">
                        <div className="password-label"><h6>Enter Password:</h6></div>
                            <div className="password-input">
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="btn-login">
                        <button type="submit" onSubmit={submitHandler} onClick={navigateToDashBoard}>Log in</button>
                    </div>
                    <div className="btn-register">
                        <button onClick={navigateToRegister}>
                            Register?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;