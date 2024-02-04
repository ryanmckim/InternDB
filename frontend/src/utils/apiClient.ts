import axios, { AxiosRequestHeaders } from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const getAxiosConfigWithHeaders = (headers?: AxiosRequestHeaders) => {
  return headers ? { headers } : {};
};

export const getRequest = async (
  path: string,
  params = {},
  headers?: AxiosRequestHeaders
) => {
  try {
    const response = await axiosInstance.get(path, {
      params,
      ...getAxiosConfigWithHeaders(headers),
    });
    return response.data;
  } catch (error) {
    console.error("GET Request error:", error);
    throw error;
  }
};

export const postRequest = async (
  path: string,
  data: any,
  headers?: AxiosRequestHeaders
) => {
  try {
    const response = await axiosInstance.post(
      path,
      data,
      getAxiosConfigWithHeaders(headers)
    );
    return response.data;
  } catch (error) {
    console.error("POST Request error:", error);
    throw error;
  }
};

export const putRequest = async (
  path: string,
  data: any,
  headers?: AxiosRequestHeaders
) => {
  try {
    const response = await axiosInstance.put(
      path,
      data,
      getAxiosConfigWithHeaders(headers)
    );
    return response.data;
  } catch (error) {
    console.error("PUT Request error:", error);
    throw error;
  }
};

export const deleteRequest = async (
  path: string,
  headers?: AxiosRequestHeaders
) => {
  try {
    const response = await axiosInstance.delete(
      path,
      getAxiosConfigWithHeaders(headers)
    );
    return response.data;
  } catch (error) {
    console.error("DELETE Request error:", error);
    throw error;
  }
};
