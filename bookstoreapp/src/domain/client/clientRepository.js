import { getData, postData, putData, deleteData } from "../../api/api";

export const getClientsAsync = async () => {
  const response = await getData("Client/GetClients");
  return response.data.clients.result;
};

export const getClientByIDAsync = async (id) => {
  return await getData(`Client/GetClient/${id}`);
};

export const insertClientAsync = async (clientData) => {
  const response = await postData("Client/InsertClient", clientData);

  if (response.message && response.message.includes("created")) {
    return response.data;
  } else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to insert client");
  }
};

export const updateClientAsync = async (id, clientData) => {
  const response = await putData(`Client/UpdateClient/${id}`, clientData);

  if (response.message && response.message.includes("updated")) {
    return response.data;
  } else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to update client");
  }
};

export const deleteClientAsync = async (id) => {
  const response = await deleteData(`Client/DeleteClient/${id}`);

  if (response.message && response.message.includes("deleted"))
    return response.data;
  else {
    console.error("Unexpected response:", response.data);
    throw new Error("Failed to delete client");
  }
};
