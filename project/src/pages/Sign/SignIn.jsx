import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../../service/usersService";
import { setCookie } from "../../helpers/cookie";
import { authContext } from "../../context/AuthProvider/AuthProvider";
import siginImg from '../../assets/img-sign.jpg'
import styles from './Signin.module.css'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

function SignIn() {
    const navigate = useNavigate()
    const { loginContext } = useContext(authContext)    
    const [showPassword, setShowPassword] = useState(false)
    const [showValid, setShowValid] = useState('none')
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = formData.email
        const password = formData.password
        const response = await login(email, password)
        if(response.length > 0){
            console.log(response);
            loginContext(response[0].token)
            setCookie('id', response[0].id, 1)
            setCookie('email', response[0].email, 1)
            setCookie('token', response[0].token, 1)
            navigate('/')
        } else {
            setShowValid('block')
        }
    };

    return (
        <>
        <div className={styles.signinContainer}>
            <div className={styles.signinLeft}>
                <img className={styles.imgSign} src={siginImg} alt="" />
            </div>
            <div className={styles.signinRight}>
                <h2>Đăng nhập</h2>
                <div className={styles.formContainer}>
                    <form className={styles.signinForm} onSubmit={handleSubmit}>
                        <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span className={styles.eyeIcon} onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}</span>
                        </div>
                        <p className={styles.alertValid} style={{display: showValid, color: 'red'}}>Sai tài khoản hoặc mật khẩu.</p>
                        <button className={styles.signinBtn} type="submit">
                        Đăng nhập
                        </button>
                        <p>Chưa có tài khoản? <a className={styles.registNow} href="/register">Đăng kí ngay</a></p>
                        <p><Link className={styles.backHome} to='/'>Quay lại trang chủ</Link></p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignIn;
