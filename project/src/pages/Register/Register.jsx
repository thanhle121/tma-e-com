import { useState } from "react";
import styles from './Register.module.css'
import { Link, useNavigate } from "react-router-dom";
import siginImg from '../../assets/img-sign.jpg'
import { register } from "../../service/usersService";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function Register() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [validEmail, setValidEmail] = useState('none')
    const [validPassword, setValidPassword] = useState('none')

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login data:", formData);
        
        if(formData.password !== formData.confirmPassword){
            setValidPassword('block')
            return
        }

        try{
            const response = await register(formData.email, formData.password)
            alert('Đăng kí thành công!!!')
            console.log(response);
            navigate('/signin')  
        } catch (err){
            if (err.message.includes('Email')) {
                setValidEmail('block');
            } else {
                alert(err.message || 'Đăng kí thất bại, hãy thử lại.');
            }
        }

    };

    return (
        <div className={styles.signinContainer}>
            <div className={styles.signinLeft}>
                <img className={styles.imgSign} src={siginImg} alt="" />
            </div>
            <div className={styles.signinRight}>
                <h2>Đăng kí</h2>
                <div className={styles.formContainer}>
                <form className={styles.signinForm} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email..."
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                    </div>

                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password..."
                            value={formData.password}
                            onChange={handleChange}
                            required
                            />
                        <span className={styles.eyeIcon} onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}</span>
                    </div>

                    <div className={styles.passwordWrapper}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password..."
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            />
                        <span className={styles.eyeIcon} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}</span>
                    </div>
                    <p style={{ display: validEmail, color: 'red' }}>Email đã được dùng, hãy chọn email khác.</p>
                    <p style={{ display: validPassword, color: 'red' }}>Mật khẩu không trùng khớp</p>
                    <button type="submit" className={styles.signinBtn}>
                    Đăng kí
                    </button>
                    <p>Đã có tài khoản? <a className={styles.registNow} href="/signin">Đăng nhập ngay</a></p>
                    <p><Link className={styles.backHome} to='/'>Quay lại trang chủ</Link></p>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
