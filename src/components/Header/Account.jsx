import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Header.module.css";

function Account() {
  return (
    <div className={styles.account}>
      <Link to="/signin">
        <UserOutlined /> Đăng nhập
      </Link>
    </div>
  );
}

export default Account;
