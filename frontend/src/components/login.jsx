import React, { useState } from 'react';
import backgroundImage from "../assets/background_desktop.png";
import logo from '../assets/core_logo.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Replace with actual backend endpoint when provided
        console.log('Login submitted', { email, password });

        // Placeholder - remove when backend is ready
        setTimeout(() => {
            setLoading(false);
            alert('Backend endpoint not yet connected');
        }, 1000);

        /* 
        // Uncomment and update when backend endpoints are provided
        try {
            const response = await fetch('BACKEND_URL_HERE', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            // Handle response
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
        */
    };


    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .login-logo {
                        width: 120px !important;
                        height: 120px !important;
                        top: 16px !important;
                        right: 16px !important;
                    }
                    .login-box {
                        width: 85% !important;
                        max-width: none !important;
                        padding: 40px 28px !important;
                    }
                    .login-title {
                        font-size: 24px !important;
                        margin-bottom: 30px !important;
                    }
                    .login-input {
                        padding: 12px 16px !important;
                        font-size: 14px !important;
                    }
                    .login-button {
                        padding: 12px !important;
                        font-size: 20px !important;
                    }
                }
                @media (max-width: 480px) {
                    .login-logo {
                        width: 70px !important;
                        height: 70px !important;
                        top: 10px !important;
                        right: 10px !important;
                    }
                    .login-box {
                        width: 85% !important;
                        padding: 35px 24px !important;
                    }
                    .login-title {
                        font-size: 20px !important;
                        margin-bottom: 24px !important;
                    }
                    .login-input {
                        padding: 10px 14px !important;
                        font-size: 14px !important;
                        margin-bottom: 16px !important;
                    }
                    .login-button {
                        padding: 10px !important;
                        font-size: 18px !important;
                        margin-bottom: 20px !important;
                    }
                    .login-footer {
                        font-size: 12px !important;
                    }
                }
            `}</style>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden'
            }}>
                {/* Background Image */}
                <img
                    src={backgroundImage}
                    alt="Background"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        zIndex: 0
                    }}
                />

                {/* Logo */}
                <img
                    src={logo}
                    alt="Core Logo"
                    className="login-logo"
                    style={{
                        position: 'fixed',
                        top: '24px',
                        right: '24px',
                        width: '200px',
                        height: '200px',
                        objectFit: 'contain',
                        zIndex: 10
                    }}
                />

                {/* Login Box */}
                <div className="login-box" style={{
                    position: 'absolute',
                    width: '494px',
                    maxWidth: '90%',
                    minHeight: '400px',
                    backgroundColor: 'black',
                    border: '2px solid #A2886D',
                    borderRadius: '10px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '60px 40px',
                    boxSizing: 'border-box'
                }}>
                    {/* Welcome Text */}
                    <h1 className="login-title" style={{
                        color: '#ceab86',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        marginBottom: '40px',
                        fontFamily: 'Gomarice, sans-serif',
                        letterSpacing: '2px',
                        textAlign: 'center'
                    }}>
                        WELCOME BACK!
                    </h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {/* Email/Phone Input */}
                        <input
                            type="text"
                            placeholder="Email or Phone"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '16px',
                                border: '2px solid #A2886D',
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                color: 'black',
                                outline: 'none',
                                marginBottom: '20px',
                                boxSizing: 'border-box',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        />

                        {/* Password Input */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '16px',
                                border: '2px solid #A2886D',
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                color: 'black',
                                outline: 'none',
                                marginBottom: '20px',
                                boxSizing: 'border-box',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        />

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="login-button"
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '10px',
                                backgroundColor: '#FFD6AC',
                                color: 'black',
                                cursor: 'pointer',
                                fontFamily: 'Gomarice, sans-serif',
                                letterSpacing: '2px',
                                marginBottom: '30px'
                            }}
                        >
                            {loading ? 'LOADING...' : 'LOGIN'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="login-footer" style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: 'Poppins, sans-serif'
                    }}>
                        Don't have an account?{' '}
                        <a
                            href="/signup"
                            style={{
                                color: '#A2886D',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            <u>SignUp</u>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}