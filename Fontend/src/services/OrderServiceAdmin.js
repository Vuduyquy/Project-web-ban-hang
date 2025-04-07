import { axiosJWT } from "./UserService";

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
