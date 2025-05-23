import React, { useEffect, useState } from "react";
import NabarComponent from "../../components/NabarComponent/NabarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProduct } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    console.log("Fetching products:", { type, page, limit });
    const res = await ProductService.getProductType(type, page, limit);

    if (res?.status === "OK") {
      setProducts(res?.data);
      setPanigate((prev) => ({
        ...prev,
        total: res?.totalRecords || res?.totalPage * prev.limit,
      }));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit, searchDebounce]);

  const onChange = (current, pageSize) => {
    setPanigate((prev) => ({
      ...prev,
      page: current - 1,
      limit: pageSize,
    }));
  };

  return (
    <Loading isLoading={loading}>
      <div style={{ padding: "0 120px", background: "#efefef" }}>
        <Row
          style={{
            background: "#efefef",
            paddingTop: "10px",
            flexWrap: "nowrap",
          }}
        >
          <WrapperNavbar
            span={4}
            style={{
              background: "#fff",
              paddingRight: "20px",
              borderRadius: "6px",
            }}
          >
            <NabarComponent />
          </WrapperNavbar>

          <Col span={20}>
            <WrapperProduct>
              {products
                ?.filter((pro) => {
                  if (searchDebounce === "") {
                    return pro;
                  } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                    return pro;
                  }
                })
                ?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    />
                  );
                })}
            </WrapperProduct>

            <Pagination
              onChange={onChange}
              total={panigate?.total}
              current={panigate.page + 1}
              pageSize={panigate.limit}
              style={{ textAlign: "center", margin: "10px" }}
            />
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
