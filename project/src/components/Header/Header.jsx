import Account from '../Account/Account'
import styles from './Header.module.css'
import Logo from '../Logo/Logo'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'

function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.nav}>
                <Logo />
                <SearchBar />
                <Menu />
                <Account />
            </div>
        </header>
    )
}

export default Header