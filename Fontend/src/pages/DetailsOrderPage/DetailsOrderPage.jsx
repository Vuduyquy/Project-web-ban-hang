import React from "react";
import {
  WrapperContentInfo,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperStyleContent,
} from "./style";

import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContent } from "../../content";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { Col, Row } from "antd";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders-details"], queryFn: fetchDetailsOrder },
    {
      enabled: id,
    }
  );
  const { isLoading, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
        <div style={{ width: "100%", maxWidth: "1270px", margin: "0 auto" }}>
          <h4>Chi tiết đơn hàng</h4>

          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={12} md={8}>
              <WrapperInfoUser>
                <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                <WrapperContentInfo>
                  <div className="name-info">{data?.shippingAddress?.fullName}</div>
                  <div className="address-info">
                    <span>Địa chỉ: </span>
                    {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                  </div>
                  <div className="phone-info">
                    <span>Điện thoại: </span> 0{data?.shippingAddress?.phone}
                  </div>
                </WrapperContentInfo>
              </WrapperInfoUser>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <WrapperInfoUser>
                <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                <WrapperContentInfo>
                  <div className="delivery-info">
                    <span className="name-delivery">FAST </span>Giao hàng tiết kiệm
                  </div>
                  <div className="delivery-fee">
                    <span>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}
                  </div>
                </WrapperContentInfo>
              </WrapperInfoUser>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <WrapperInfoUser>
                <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                <WrapperContentInfo>
                  <div className="payment-info">{orderContent.payment[data?.paymentMethod]}</div>
                  <div className="status-payment">{data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</div>
                </WrapperContentInfo>
              </WrapperInfoUser>
            </Col>
          </Row>

          <WrapperStyleContent>
            <Row
              gutter={[16, 16]}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <Col xs={24} md={10} style={{ textAlign: "left" }}>
                Sản phẩm
              </Col>
              <Col xs={6} md={4}>
                <WrapperItemLabel>Giá</WrapperItemLabel>
              </Col>
              <Col xs={6} md={4}>
                <WrapperItemLabel>Số lượng</WrapperItemLabel>
              </Col>
              <Col xs={6} md={4}>
                <WrapperItemLabel>Giảm giá</WrapperItemLabel>
              </Col>
            </Row>

            {data?.orderItems?.map((order, index) => (
              <Row
                gutter={[16, 16]}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                  borderBottom: "1px solid #eee",
                  padding: "10px 0",
                }}
              >
                <Col xs={24} md={10} style={{ display: "flex", alignItems: "center", textAlign: "left" }}>
                  <WrapperNameProduct>
                    <img
                      src={order?.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        border: "1px solid rgb(238, 238, 238)",
                        padding: "2px",
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Điện thoại
                    </div>
                  </WrapperNameProduct>
                </Col>
                <Col xs={6} md={4}>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                </Col>
                <Col xs={6} md={4}>
                  <WrapperItem>{order?.amount}</WrapperItem>
                </Col>
                <Col xs={6} md={4}>
                  <WrapperItem>
                    {order?.discount ? convertPrice((priceMemo * order?.discount) / 100) : "0 VND"}
                  </WrapperItem>
                </Col>
              </Row>
            ))}

            <Row
              gutter={[16, 16]}
              style={{ display: "flex", justifyContent: "space-between", textAlign: "center", marginTop: "16px" }}
            >
              <Col xs={12} md={18}>
                <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              </Col>
              <Col xs={12} md={6}>
                <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
              <Col xs={12} md={18}>
                <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
              </Col>
              <Col xs={12} md={6}>
                <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
              <Col xs={12} md={18}>
                <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              </Col>
              <Col xs={12} md={6}>
                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
              </Col>
            </Row>
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrderPage;
