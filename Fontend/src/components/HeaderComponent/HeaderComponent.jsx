import React, { useEffect } from "react";
import {
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperUserOutlined,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./styles";
import { Badge, Col, Popover, Row } from "antd";
import * as UserService from "../../services/UserService";

import { CaretDownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slices/productSlice";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogin = () => {
    navigate("/signIn");
  };
  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await UserService.logoutUser();
      localStorage.removeItem("access_token");
      dispatch(resetUser());
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "rgb(249, 78, 47)",
        justifyContent: "center",
      }}
    >
      <Row
        gutter={[16, 16]}
        justify="space-between"
        style={{
          width: "100%",
          maxWidth: "1200px", // Giới hạn chiều rộng tối đa
          padding: "20px 16px",
        }}
      >
        <Col xs={24} sm={6} md={5}>
          <WrapperTextHeader onClick={handleHome}>SHOP</WrapperTextHeader>
        </Col>

        {!isHiddenSearch && (
          <Col xs={24} sm={12} md={13}>
            <ButtonInputSearch
              size="large"
              placeholder="Nhập Tên Sản Phẩm"
              textButton="Tìm Kiếm"
              bordered={false}
              onChange={onSearch}
            />
          </Col>
        )}

        <Col xs={24} sm={6} md={6} style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <WrapperUserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <Popover content={content} trigger="click" open={isOpenPopup}>
                  <div
                    style={{
                      cursor: "pointer",
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => setIsOpenPopup((prev) => !prev)}
                  >
                    {userName?.length ? userName : user?.email}
                  </div>
                </Popover>
              ) : (
                <div>
                  <WrapperTextHeaderSmall onClick={handleLogin} style={{ cursor: "pointer" }}>
                    Đăng Nhập / Đăng Kí
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate("/order")} style={{ cursor: "pointer" }}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: "30px", color: "#fff" }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
