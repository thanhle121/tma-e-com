import csoon1 from '../../assets/csoon1.jpg'
import csoon2 from '../../assets/csoon2.png'
import csoon3 from '../../assets/csoon3.png'
import csoon from '../../assets/csoon.webp'
import styles from './CoommingSoon.module.css'

export const CoommingSoon = () => {
    return(
        <>
            <div className={styles.csoonWrapper}>
                <div className={styles.csoonLeft}><img src={csoon2} alt="" /></div>
                <div className={styles.csoonRight}>
                    <img className={styles.csoonTop} src={csoon} alt="" />
                    <div className={styles.csoonBottom}>
                        <img src={csoon1} alt="" />
                        <img src={csoon3} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}