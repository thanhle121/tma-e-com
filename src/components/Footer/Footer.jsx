import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMenu}>
        <div className={styles.footerSection}>
          <h2>Chăm sóc khách hàng</h2>
          <a href="/">Hướng dẫn mua hàng</a>
          <a href="/">Hướng dẫn thanh toán</a>
          <a href="/">Dịch vụ hoàn tiền</a>
          <a href="/">Đổi trả</a>
        </div>

        <div className={styles.footerSection}>
          <h2>Danh sách cửa hàng</h2>
          <a href="/">1 Phạm Văn Đồng, Q.1, TPHCM</a>
          <a href="/">1 Phạm Văn Đồng, Q.4, TPHCM</a>
          <a href="/">1 Phạm Văn Đồng, Q.2, TPHCM</a>
          <a href="/">1 Phạm Văn Đồng, Q.10, TPHCM</a>
        </div>

        <div className={styles.footerSection}>
          <h2>Kết nối với chúng tôi</h2>
          <a href="/">Facebook</a>
          <a href="/">Youtube</a>
          <a href="/">Instagram</a>
        </div>

        <div className={styles.footerSection}>
          <h2>Đơn vị vận chuyển</h2>
          <a href="/">Shopee Express</a>
          <a href="/">Giao hàng nhanh</a>
          <a href="/">Ninja Van</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
