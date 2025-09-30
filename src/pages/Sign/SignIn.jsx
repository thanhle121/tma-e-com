// src/pages/Sign/SignIn.jsx
import { useState } from "react";
import './Login.css'
import { Link } from 'react-router-dom'

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", formData);
    };

    return (
        <div className="signin-container">
            <h2>Đăng nhập</h2>
            <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                <div className="form-label">Email:</div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                <div className="form-label">Mật khẩu:</div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>

                <button type="submit" className="btn-submit">
                Đăng nhập
                </button>
                <p>Chưa có tài khoản? <a href="/register">Đăng kí ngay</a></p>
                <p><Link className="back-home" to='/'>Quay lại trang chủ</Link></p>
            </form>
            </div>
        </div>
    );
}

export default SignIn;
