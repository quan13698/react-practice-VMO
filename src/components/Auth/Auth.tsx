import { MouseEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ILoginPayload } from "../../contexts/AuthContext";


function Auth() {
    const navigate = useNavigate();
    const navigateToDashBoard = () => {
        navigate('/dashboard')
    }
    const navigateToRegister = () => {
        navigate('/register')
    }
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(AuthContext); 
    let mailFromLS = localStorage.getItem('userList')
    
    const submitHandler = (e: any) => {
        // if(mail === mail)
        console.log(mailFromLS);
        context.onLogin(e,navigateToDashBoard)
        
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
                                    type="mail"
                                    value={mail}
                                    onChange={(e) => {
                                        setMail(e.target.value)
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
                        <button type="button" onClick={submitHandler}>Log in</button>
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