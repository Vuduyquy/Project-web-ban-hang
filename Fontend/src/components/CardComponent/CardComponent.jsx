import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperStyleTextSell,
  WrapperText,
  WrapperTextDiscount,
  WrapperTextPrice,
} from "./style";

import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const { image, name, price, rating, discount, selled, id } = props;
  const navigate = useNavigate();
  const handleDetailProduct = (id) => {
    navigate(`/productDetail/${id}`);
  };

  return (
    <WrapperCardStyle
      headStyle={{ width: "200px", height: "200px" }}
      style={{
        width: 200,
      }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 0}</WrapperStyleTextSell>
      </WrapperText>

      <WrapperTextPrice>
        <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
        <WrapperTextDiscount> - {discount || 5} %</WrapperTextDiscount>
      </WrapperTextPrice>
    </WrapperCardStyle>
  );
};

export default CardComponent;
