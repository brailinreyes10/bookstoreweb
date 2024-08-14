import Select from "react-select";
import HeaderComponent from "./headerComponent";
import { useEffect, useState } from "react";
import { getClientsAsync } from "../domain/client/clientRepository";
import { getBooksAsync } from "../domain/book/bookRepository";
import { Button } from "react-bootstrap";
import { insertSaleAsync } from "../domain/sale/saleRepository";
import { useNavigate } from "react-router-dom";

export default function HomeComponent() {
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksOptions, setBooksOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [saleDetails, setSaleDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchClients();
        await fetchBooks();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchClients = async () => {
    const clientsList = await getClientsAsync();

    const clientsOptions = clientsList.map((client) => ({
      value: client.clientID,
      label: client.fullName,
    }));

    setClients(clientsOptions);
  };

  const fetchBooks = async () => {
    const booksList = await getBooksAsync();

    const booksOptions = booksList.map((book) => ({
      value: book.bookID,
      label: book.title,
    }));

    setBooksOptions(booksOptions);
    setBooks(booksList);
  };

  const selectClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
    setSelectedBook("");
    setSaleDetails([]);
  };

  const selectBookChange = (selectedOption) => {
    setSelectedBook(selectedOption);
  };

  const addBook = () => {
    if (selectedClient) {
      if (selectedBook) {
        if (!saleDetails.some((sd) => sd.bookId === selectedBook.value)) {
          const book = books.filter(
            (book) => book.bookID === selectedBook.value
          )[0];

          const newDetail = {
            bookId: book.bookID,
            title: book.title,
            price: book.price,
          };

          setSaleDetails((prevDetails) => [...prevDetails, newDetail]);
          setSelectedBook(null);
        } else {
          setSelectedBook(null);
          window.alert("Solo puede agregar un libro a la vez.");
        }
      } else window.alert("Debe seleccionar un libro");
    } else window.alert("Debe seleccionar un cliente");
  };

  const saveSale = async () => {
    if (window.confirm("Esta seguro de completar esta venta?")) {
      if (saleDetails.length > 0) {
        const details = saleDetails.map(({ bookId, price }) => ({
          bookID: bookId,
          salePrice: price,
        }));

        var data = await insertSaleAsync({
          clientID: selectedClient.value,
          details: details,
        });

        if (data) {
          window.print();
          resetForm();
        }
      } else window.alert("Agregue al menos un libro");
    }
  };

  const resetForm = () => {
    setSelectedClient("");
    setSelectedBook("");
    setSaleDetails([]);
  };

  const goToSaleComponent = () => {
    navigate("/sale", { state: { filtered: true } });
  };

  const removeBookFromSale = (index) => {
    setSaleDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails.splice(index, 1);
      return updatedDetails;
    });
  };

  return (
    <div>
      <HeaderComponent />

      <div className="container-fluid px-5">
        <hr />
        <div className="row">
          <h1 className="col-md-9">Realizar una Venta</h1>
          <Button
            variant="info"
            className="btn col-md-2"
            onClick={goToSaleComponent}
            style={{ height: "40px" }}
          >
            Ver Ventas del Día
          </Button>
        </div>
        <hr />
        <div style={{ padding: "20px" }}>
          <div className="row align-items-center">
            <h5
              className="col-md-1"
              style={{
                marginRight: "-40px",
              }}
            >
              Clientes
            </h5>
            <div className="col-md-3">
              <Select
                value={selectedClient}
                onChange={selectClientChange}
                options={clients}
                placeholder="Seleccione un cliente"
                isClearable
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
            <h5
              className="col-md-1"
              style={{
                marginRight: "-40px",
              }}
            >
              Libros
            </h5>
            <div className="col-md-3">
              <Select
                value={selectedBook}
                onChange={selectBookChange}
                options={booksOptions}
                placeholder="Seleccione un libro"
                isClearable
              />
            </div>

            <Button className="btn btn-info col-md-1 fw-bold" onClick={addBook}>
              Agregar
            </Button>
          </div>
          <hr />
          {saleDetails.length > 0 ? (
            <div className="col-md-8">
              <Button className="btn btn-info fw-bold mx-3" onClick={resetForm}>
                Cancelar venta
              </Button>
              <Button className="btn btn-info fw-bold" onClick={saveSale}>
                Completar venta
              </Button>
              <hr />
              <h6 className="d-flex justify-content-end me-2">
                Total: {saleDetails.length}
              </h6>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Titulo del Libro</th>
                    <th scope="col">Precio de Venta</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {saleDetails.map((saleDetail, index) => (
                    <tr key={index}>
                      <td>{saleDetail.title}</td>
                      <td>
                        {saleDetail.price > 0 ? `$RD${saleDetail.price}` : "-"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => removeBookFromSale(index)}
                          >
                            &minus;
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td className="fw-bold">
                      {saleDetails.reduce(
                        (total, saleDetail) => total + saleDetail.price,
                        0
                      ) > 0
                        ? `$RD ${saleDetails
                            .reduce(
                              (total, saleDetail) => total + saleDetail.price,
                              0
                            )
                            .toFixed(2)}`
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
