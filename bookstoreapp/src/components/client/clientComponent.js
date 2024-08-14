/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from "react";
import edit50 from "../../assets/edit50.png";
import delete60 from "../../assets/delete60.png";
import {
  getClientsAsync,
  insertClientAsync,
  updateClientAsync,
  deleteClientAsync,
} from "../../domain/client/clientRepository";
import { Modal, Button, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import "../../App.css";
import HeaderComponent from "../headerComponent";
import {
  formatIdentificationNumber,
  formatPhoneNumber,
} from "../../utlis/utils";
import PaginationComponent from "../paginationComponent";

export default function ClientComponent() {
  const [clients, setClients] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [editingClientID, setEditingClientID] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(clients.length / clientsPerPage);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientList = await getClientsAsync();

      const sortedClientList = clientList.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );

      setClients(sortedClientList);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const showModalEvent = (client = null) => {
    if (client) {
      setFirstName(client.firstName);
      setLastName(client.lastName);
      setIdentificationNumber(client.identificationNumber);
      setPhone(client.phone);
      setAddress(client.address);
      setEditingClientID(client.clientID);
      setStatusCode(client.statusCode);
    } else {
      setFirstName("");
      setLastName("");
      setIdentificationNumber("");
      setPhone("");
      setAddress("");
      setStatusCode("");
      setEditingClientID(0);
    }
    setShowModal(true);
  };

  const closeModalEvent = () => {
    resetForm();
    setShowModal(false);
  };

  const optionsClick = (event, client, action) => {
    event.stopPropagation();
    if (action === "edit") {
      showModalEvent(client);
    } else if (action === "delete") {
      deleteClient(client.clientID);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setIdentificationNumber("");
    setPhone("");
    setAddress("");
    setEditingClientID(0);
  };

  const saveOrUpdateClient = async (e) => {
    e.preventDefault();
    try {
      if (editingClientID !== undefined) {
        var data = await updateClientAsync(editingClientID, {
          clientID: editingClientID,
          firstName,
          lastName,
          identificationNumber,
          phone,
          address,
          statusCode: statusCode,
        });

        if (data.result) {
          setShowModal(false);

          fetchClients();
        }
      } else {
        var result = await insertClientAsync({
          firstName,
          lastName,
          identificationNumber,
          phone,
          address,
        });

        if (result.clientID > 0) {
          setShowModal(false);
          fetchClients();
        }
      }
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const deleteClient = async (clientId) => {
    if (window.confirm("Estas seguro de eliminar este cliente?")) {
      try {
        await deleteClientAsync(clientId).then(
          setClients(clients.filter((client) => client.clientID !== clientId))
        );
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <div>
      <HeaderComponent />

      {/* Body */}
      <div className="container">
        <hr />
        <h1>Administración de Clientes</h1>
        <hr />

        <div className="row align-items-center mb-3">
          <button className="btn btn-info col-md-1" onClick={showModalEvent}>
            Agregar
          </button>

          <h6 className="d-flex justify-content-end col-md-10 ms-5">
            Total: {clients.length}
          </h6>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nombre</th>
              <th scope="col">Cedula</th>
              <th scope="col">Telefono</th>
              <th scope="col">Direccion</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.clientID} style={{ cursor: "pointer" }}>
                <td>
                  <center>-</center>
                </td>
                <td>{client.fullName}</td>
                <td>
                  {formatIdentificationNumber(client.identificationNumber)}
                </td>
                <td>{formatPhoneNumber(client.phone)}</td>
                <td>{client.address}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="light"
                      className="btn btn-outline-info"
                      onClick={(e) => optionsClick(e, client, "edit")}
                      style={{ marginRight: "10px" }}
                    >
                      <img src={edit50} alt="Edit" width={20} />
                    </Button>
                    <Button
                      variant="light"
                      className="btn btn-outline-danger"
                      onClick={(e) => optionsClick(e, client, "delete")}
                    >
                      <img src={delete60} alt="Delete" width={26} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {/* Body */}

      {/* Modal */}
      <Modal show={showModal} onHide={closeModalEvent}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingClientID ? "Editar cliente" : "Agregar nuevo cliente"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={saveOrUpdateClient}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formIdentificationNumber">
              <Form.Label>Cedula</Form.Label>
              <InputMask
                mask="999-9999999-9"
                value={identificationNumber}
                onChange={(e) =>
                  setIdentificationNumber(e.target.value.replace(/-/g, ""))
                }
              >
                {(inputProps) => (
                  <Form.Control
                    {...inputProps}
                    type="text"
                    placeholder="Ingrese su cédula"
                    required
                  />
                )}
              </InputMask>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Telefono</Form.Label>
              <InputMask
                mask="(999) 999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/-/g, ""))}
              >
                {(inputProps) => (
                  <Form.Control
                    {...inputProps}
                    type="text"
                    placeholder="Ingrese su teléfono"
                    required
                  />
                )}
              </InputMask>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-end">
              <Button variant="info" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal */}
    </div>
  );
}
