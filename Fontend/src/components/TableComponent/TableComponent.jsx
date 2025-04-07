import { Table } from "antd";
import React, { useMemo, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = ({
  selectionType = "checkbox",
  data: dataSource = [],
  isLoading = false,
  columns = [],
  handleDeleteMany,
  pagination,
  onTableChange,
  ...props
}) => {
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const newColumnExport = useMemo(() => {
    return columns.filter((col) => col.dataIndex !== "action");
  }, [columns]);

  const rowSelection = {
    type: selectionType,
    selectedRowKeys: rowSelectedKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      setRowSelectedKeys(selectedRowKeys);
    },
  };

  const handleDeleteAll = () => {
    if (window.confirm("Bạn chắc chắn muốn xóa tất cả mục đã chọn?")) {
      handleDeleteMany(rowSelectedKeys);
    }
  };

  const exportExcel = () => {
    try {
      const excel = new Excel();
      excel
        .addSheet("test")
        .addColumns(newColumnExport)
        .addDataSource(dataSource, {
          str2Percent: true,
        })
        .saveAs("Excel.xlsx");
      alert("File Excel đã được lưu!");
    } catch (error) {
      console.error("Lỗi khi xuất Excel:", error);
      alert("Đã xảy ra lỗi khi xuất Excel.");
    }
  };

  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: "#1d1ddd",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            padding: "10px",
            textAlign: "center",
            marginBottom: "10px",
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}

      <button onClick={exportExcel}>Export Excel</button>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={onTableChange}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
