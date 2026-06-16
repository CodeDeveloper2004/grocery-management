import axios from "axios"
import API from "./api";

export const getProductStatuses = async () => {

  const response = await API.get(
    "/api/products/statuses"
  );

  return response.data.map(item => ({
    label: item.replaceAll("_", " "),
    value: item
  }));
};

export const getUnitTypes = async () => {

  const response = await API.get(
    "/api/products/unit-types"
  );

  return response.data.map(item => ({
    label: item.replaceAll("_", " "),
    value: item
  }));
};

export const createProduct = async (
  payload
) => {

  const response =
    await API.post(
      "/api/products/create",
      payload
    );

  return response.data;
};

export const getProducts = async () => {

  const response =
    await API.get(
      "/api/products/get",
    );

  return response.data;
};

export const updateProduct = async (payload) => {

  const response =
    await API.post(
      "/api/products/update",
      payload
    );

  return response.data;
};