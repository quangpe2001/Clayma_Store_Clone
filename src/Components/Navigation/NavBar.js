import React, { useState, useContext } from "react";
import {
  faBars,
  faShoppingCart,
  faCaretDown,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import {
  Space,
  Typography,
  Input,
  notification,
  Form,
  Button,
  Checkbox,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setLogged } from "../../slice";
import { useEffect } from "react";

export default function NavBar(hasLoggin) {
  const { myShoppingCart } = useContext(GlobalCartContext);
  const [toggleNav, setToggelNav] = useState(false);

  const logged = useSelector((state) => state.counter.hasLogged);
  const dispatch = useDispatch();
  function handleToggle(e) {
    e.preventDefault();
    setToggelNav(!toggleNav);
  }

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModaLoginlOpen, setIsModalLoginOpen] = useState(false);
  const [loggin, setLoggin] = useState(false);

  useEffect(() => {
    console.log(hasLoggin.hasLoggin);
    if (logged) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
    console.log(logged);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalLogin = () => {
    setIsModalLoginOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleLogout = () => {
    setIsModalLoginOpen(false);
    setLoggin(false);
  };
  const handleCancelLogin = () => {
    setIsModalLoginOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values.username == "admin" && values.password == "admin") {
      console.log("yes");
      setIsModalOpen(false);
      setLoggin(true);
      openSuccessNotification();
      dispatch(setLogged(true));
    } else {
      console.log("no");
      openFailNotification();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const openSuccessNotification = () => {
    notification.open({
      message: "Login successfully",
      type: "success",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const openFailNotification = () => {
    notification.open({
      message: "Login failed",
      type: "error",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <div>
      <header>
        <div className="container-nav">
          <nav className={` ${toggleNav ? "active" : ""}`}>
            <div className="menu-icon">
              <FontAwesomeIcon
                icon={faBars}
                className="menu-icon-bar"
                onClick={(e) => handleToggle(e)}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className="menu-icon-close"
                onClick={(e) => handleToggle(e)}
              />
            </div>

            <ul className="navigation-list">
              <li>
                <Link to="/">Home</Link>
                {/* <a href="/">Home</a>     */}
              </li>
              <li>
                <Link to="#">
                  Products
                  <i className="icon ">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>

                <ul className="products-cat">
                  <li>
                    <Link to="/collections">All</Link>
                  </li>
                  <li>
                    <Link to="/collections/men">Men</Link>
                  </li>
                  <li>
                    <Link to="/collections/women">Women</Link>
                  </li>
                  <li>
                    <Link to="/collections/kids">Kids</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#">
                  Collections
                  <i className="icon ">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
                <ul className="products-cat">
                  <li>
                    <Link to="/trend/New">New Arrival</Link>
                  </li>
                  <li>
                    <Link to="/trend/Trending">Trending</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/search">Search</Link>
              </li>

              <li className="nav-shopping-cart">
                <Link
                  to="/cart"
                  className="cart position-relative d-inline-flex"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="store-cart-icon"
                  />
                  <span className="cart-basket d-flex align-items-center justify-content-center ">
                    {myShoppingCart.length}{" "}
                  </span>
                </Link>
              </li>

              <li className="test">
                <Link className="cart position-relative d-inline-flex">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="store-cart-icon"
                    onClick={() => {
                      if (loggin) {
                        showModalLogin();
                      } else {
                        showModal();
                      } /* 
                      showModal(); */
                    }}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Modal
        title="LOGIN"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ style: { children: "login", backgroundColor: "red" } }}
        okText="login"
      >
        <Form
          form={form}
          name="basic"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="welcome, ADMIN"
        open={isModaLoginlOpen}
        onOk={handleLogout}
        onCancel={handleCancelLogin}
        okButtonProps={{
          style: { children: "logout", backgroundColor: "red" },
        }}
        okText="logout"
      >
        <Space direction="vertical">
          <Space>
            <Typography>username</Typography>
            <Typography>admin</Typography>
          </Space>
        </Space>
      </Modal>
    </div>
  );
}
