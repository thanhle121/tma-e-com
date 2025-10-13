import styles from "./Footer.module.css";
import { QRCode } from 'antd';
import { CopyrightOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
import { cskh, dsch, express } from "../../constant/ftrContent";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMenu}>
        <div className={styles.footerSection}>
          <h2>{cskh.label}</h2>
          {cskh &&
            cskh.content.map((item, index) => {
              return (
                  <a key={index} href={item.href}>
                    {item.content}
                  </a>
              );
            })}
        </div>

        <div className={styles.footerSection}>
          <h2>{dsch.label}</h2>
          {dsch && dsch.content.map((item, index)=>(
            <p key={index}>{item.content}</p>
          ))}
        </div>

        <div className={styles.footerSection}>
          <h2>{express.label}</h2>
          {express && express.content.map((item, index)=>(
            <p key={index}>{item.content}</p>
          ))}
        </div>

        <div className={styles.footerSection}>
          <h2>Download App</h2>
          <div className={styles.contact}>
            <QRCode icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" bgColor="#fff" bordered={false} size={120} type="canvas" value="https://ant.design/" />
            <div className={styles.icon}>
              <FacebookOutlined />
              <InstagramOutlined />
              <TwitterOutlined />
              <LinkedinOutlined />
            </div>
          </div>
            
        </div>
      </div>
      <div className={styles.copyRight}><CopyrightOutlined />Copyright By Me 2025. All Right Reserved</div>
    </footer>
  );
}

export default Footer;
