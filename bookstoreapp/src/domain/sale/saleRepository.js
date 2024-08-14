import { getData, postData } from "../../api/api";

export const getSalesAsync = async () => {
  const response = await getData("Sale/GetSales");

  return response.data.sales.result;
};

export const getSaleDetailsBySaleIdAsync = async (saleId) => {
  const response = await getData(`Sale/GetSaleDetails/${saleId}`);

  return response.data.saleDetails.result;
};

export const insertSaleAsync = async (saleData) => {
  const response = await postData("Sale/InsertSale", saleData);

  if (response.message && response.message.includes("created")) {
    return response.data;
  } else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to insert client");
  }
};
