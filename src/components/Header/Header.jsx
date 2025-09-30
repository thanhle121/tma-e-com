import Account from './Account'
import styles from './Header.module.css'
import Logo from './Logo'
import Menu from './Menu'
import SearchBar from './SearchBar'

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