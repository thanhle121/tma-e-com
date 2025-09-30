import { useNavigate } from 'react-router'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'
function Logo(){
    const navigate = useNavigate()
    return(
        <div className={styles.logo}>
            <img onClick={()=>navigate('/')} src={logo} alt="" />
        </div>
    )
}

export default Logo