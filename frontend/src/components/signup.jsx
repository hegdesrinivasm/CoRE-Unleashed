import React, { useState } from 'react';
import backgroundImage from "../assets/background_desktop.png";
import logo from '../assets/core_logo.png';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setLoading(true);

        // TODO: Replace with actual backend endpoint when provided
        console.log('Signup submitted', { name, email, password });

        setTimeout(() => {
            setLoading(false);
            alert('Backend endpoint not yet connected');
        }, 1000);
    };

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .signup-logo {
                        width: 120px !important;
                        height: 120px !important;
                        top: 16px !important;
                        right: 16px !important;
                    }
                    .signup-box {
                        width: 85% !important;
                        max-width: none !important;
                        padding: 40px 28px !important;
                    }
                    .signup-title {
                        font-size: 22px !important;
                        margin-bottom: 30px !important;
                    }
                    .signup-input {
                        padding: 12px 16px !important;
                        font-size: 14px !important;
                    }
                    .signup-button {
                        padding: 12px !important;
                        font-size: 20px !important;
                    }
                }
                @media (max-width: 480px) {
                    .signup-logo {
                        width: 70px !important;
                        height: 70px !important;
                        top: 10px !important;
                        right: 10px !important;
                    }
                    .signup-box {
                        width: 85% !important;
                        padding: 35px 24px !important;
                    }
                    .signup-title {
                        font-size: 18px !important;
                        margin-bottom: 24px !important;
                    }
                    .signup-input {
                        padding: 10px 14px !important;
                        font-size: 14px !important;
                        margin-bottom: 16px !important;
                    }
                    .signup-button {
                        padding: 10px !important;
                        font-size: 18px !important;
                        margin-bottom: 20px !important;
                    }
                    .signup-footer {
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
                    className="signup-logo"
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

                {/* Signup Box */}
                <div className="signup-box" style={{
                    position: 'absolute',
                    width: '494px',
                    maxWidth: '90%',
                    backgroundColor: 'black',
                    border: '2px solid #A2886D',
                    borderRadius: '20px',
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
                    <h1 className="signup-title" style={{
                        color: '#ceab86',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        marginBottom: '40px',
                        fontFamily: 'Gomarice, sans-serif',
                        letterSpacing: '2px',
                        textAlign: 'center'
                    }}>
                        JOIN CoRE UNLEASHED
                    </h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

                        {/* Email Input */}
                        <input
                            type="text"
                            value={email}
                            placeholder='Email or Phone'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="signup-input"
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
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="signup-input"
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

                        {/* Confirm Password Input */}
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder='Re-enter password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="signup-input"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '16px',
                                border: '2px solid #A2886D',
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                color: 'black',
                                outline: 'none',
                                boxSizing: 'border-box',
                                fontFamily: 'Poppins, sans-serif',
                                marginBottom: '20px'
                            }}
                        />

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="signup-button"
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '10px',
                                backgroundColor: '#FFD6AD',
                                color: 'black',
                                cursor: 'pointer',
                                fontFamily: 'Gomarice, sans-serif',
                                letterSpacing: '2px',
                                marginBottom: '30px'
                            }}
                        >
                            {loading ? 'LOADING...' : 'SIGN UP'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="signup-footer" style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '14px'
                    }}>
                        Already have an account?{' '}
                        <a
                            href="/"
                            style={{
                                color: '#A2886D',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            <u>Login</u>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}