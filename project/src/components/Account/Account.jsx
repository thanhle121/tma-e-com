import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Account.module.css";
import { useContext } from "react";
import { authContext } from "../../context/AuthProvider/AuthProvider";
import { getCookie } from "../../helpers/cookie";
import { Dropdown } from "antd";

function Account() {
    const { token, logoutContext } = useContext(authContext)
    const navigate = useNavigate()
    const handleLogout = () => {
      logoutContext()
      navigate('/signin')
    }

    const handleChangePassword = () => {
      navigate('/cpass')
    }

    const handleOrder = () => {
      navigate('/order')
    }

    const handleWishList = () => {
      navigate('/wish-list')
    }

    const email = getCookie('email').split('@')[0]

    const items = [
      {
        key: 'order-info',
        label: (
          <div onClick={handleOrder} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Đơn hàng
          </div>
        )
      },
      {
        key: 'wish-list',
        label: (
          <div onClick={handleWishList} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Wish List
          </div>
        )
      },
      {
        key: 'change-password',
        label: (
          <div onClick={handleChangePassword} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Đổi mật khẩu
          </div>
        )
      },
      {
        key: 'logout',
        label: (
          <div onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Đăng xuất
          </div>
        )
      },
    ]

    return (
      <>
      {token ? (
        <Dropdown menu={{ items }} placement='bottomRight'>
        <div className={styles.account}>
          <img className={styles.accountUser} src="https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="" />
          <div>
            {email}
          </div>
        </div>
        </Dropdown>
      ):(
        <button className={styles.account}>
          <Link to="/signin">
            <UserOutlined /> Đăng nhập
          </Link>
        </button>
      )}
      </>
    );
}

export default Account;
