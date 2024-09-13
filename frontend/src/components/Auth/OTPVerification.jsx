import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Clear error message once user starts typing
        setError("");

        // Focus on the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');

        if (enteredOtp.length === 6) {
            console.log("Entered OTP is:", enteredOtp);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    enteredOtp: enteredOtp,
                    generatedOtp: localStorage.getItem('Otp'),
                    email: localStorage.getItem('email'),
                }),
            });
            const result = await response.json();
            console.log(result);
            if (response.status === 400) {
                alert("Invalid OTP");
            } else if (response.status === 200) {
                alert('OTP verified successfully');
                navigate('/login');
            }
        } else {
            setError("Please enter a 6-digit OTP.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>OTP Verification</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.otpContainer}>
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            style={styles.input}
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            required
                        />
                    ))}
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7fafc',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: '#2d3748',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    otpContainer: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
    },
    input: {
        width: '3rem',
        height: '3.5rem',
        fontSize: '1.5rem',
        textAlign: 'center',
        border: '1px solid #cbd5e0',
        borderRadius: '0.375rem',
        outline: 'none',
        transition: 'border-color 0.2s ease-in-out, transform 0.2s ease-in-out',
    },
    inputFocus: {
        borderColor: '#4299e1',
    },
    error: {
        color: '#f56565',
        marginBottom: '1rem',
    },
    button: {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#3182ce',
        color: '#fff',
        borderRadius: '0.375rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
    },
    buttonHover: {
        backgroundColor: '#2b6cb0',
    },
};

export default OTPVerification;
