import { getData, postData, putData, deleteData } from "../../api/api";

export const getBooksAsync = async () => {
  const response = await getData("Book/GetBooks");

  return response.data.books.result;
};

export const getBookByIDAsync = async (id) => {
  return await getData(`Book/GetBook/${id}`);
};

export const insertBookAsync = async (BookData) => {
  const response = await postData("Book/InsertBook", BookData);

  if (response.message && response.message.includes("created")) {
    return response.data;
  } else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to insert Book");
  }
};

export const updateBookAsync = async (id, BookData) => {
  const response = await putData(`Book/UpdateBook/${id}`, BookData);

  if (response.message && response.message.includes("updated")) {
    return response.data;
  } else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to update Book");
  }
};

export const deleteBookAsync = async (id) => {
  const response = await deleteData(`Book/DeleteBook/${id}`);

  if (response.message && response.message.includes("deleted"))
    return response.data;
  else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to delete Book");
  }
};
