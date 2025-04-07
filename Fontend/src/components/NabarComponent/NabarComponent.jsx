import React from "react";
import { WrapperContent, WrapperLabText, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
  const renderContent = (type, option) => {
    const onChange = () => {};
    switch (type) {
      case "text":
        return option.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {option.map((option) => {
              return (
                <Checkbox style={{ marginLeft: "0" }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return option.map((option) => {
          return (
            <div style={{ display: "flex", gap: "4px" }}>
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={option} />
              <span>{`tu ${option} sao `}</span>
            </div>
          );
        });
      case "price":
        return option.map((option) => {
          return (
            <div style={{ display: "flex", gap: "4px" }}>
              <WrapperTextPrice>{option}</WrapperTextPrice>
            </div>
          );
        });

      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLabText>label</WrapperLabText>
      <WrapperContent>{renderContent("text", ["Lap Top", "Ipad", "Iphone"])}</WrapperContent>
    </div>
  );
};

export default NavbarComponent;
