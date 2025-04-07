import axios from "axios";

// Lấy tất cả sản phẩm, với tùy chọn tìm kiếm và giới hạn số lượng
export const getAllProduct = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`);
  }
  return res.data;
};

export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
  }
};

// Lấy chi tiết sản phẩm theo ID
export const getDetailsProduct = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/product/get-details/${id}`;

  const res = await axios.get(url);
  return res.data;
};

// Lấy tất cả loại sản phẩm
export const getAllTypeProduct = async () => {
  const url = `${process.env.REACT_APP_API_URL}/product/get-all-type`;

  const res = await axios.get(url);
  return res.data;
};

export const getSuggestedProducts = async (search) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/suggestions?search=${search}`);

    // Axios đã tự động phân tích cú pháp JSON nên bạn có thể trả về trực tiếp res.data
    return res.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error; // Thêm lỗi để có thể xử lý khi gọi hàm này
  }
};
