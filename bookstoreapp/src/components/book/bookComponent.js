/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Button, Form, Modal } from "react-bootstrap";
import edit50 from "../../assets/edit50.png";
import delete60 from "../../assets/delete60.png";
import { useEffect, useState } from "react";
import {
  deleteBookAsync,
  getBooksAsync,
  insertBookAsync,
  updateBookAsync,
} from "../../domain/book/bookRepository";
import HeaderComponent from "../headerComponent";
import PaginationComponent from "../paginationComponent";

export default function BookComponent() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [yearWritten, setYearWritten] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [price, setPrice] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingBookID, setEditingBookID] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  useEffect(() => {
    fetchBooks();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchBooks = async () => {
    try {
      const booksList = await getBooksAsync();

      const sortedBookList = booksList.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setBooks(sortedBookList);
    } catch (error) {}
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const showModalEvent = (book = null) => {
    if (book) {
      setTitle(book.title);
      setYearWritten(book.yearWritten);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setPublishedDate(book.publishedDate);
      setPrice(book.price);
      setEditingBookID(book.bookID);
      setStatusCode(book.statusCode);
    } else {
      setTitle("");
      setYearWritten("");
      setAuthor("");
      setPublisher("");
      setPrice("");
      setStatusCode("");
      setEditingBookID(0);
    }
    setShowModal(true);
  };

  const closeModalEvent = () => {
    resetForm();
    setShowModal(false);
  };

  const rowClick = (client) => {
    window.confirm("Vas a ir al detalle del libro prontamente");
  };

  const optionsClick = (event, book, action) => {
    event.stopPropagation();
    if (action === "edit") {
      showModalEvent(book);
    } else if (action === "delete") {
      deleteBook(book.bookID);
    }
  };

  const resetForm = () => {
    setTitle("");
    setYearWritten("");
    setAuthor("");
    setPublisher("");
    setPrice("");
    setStatusCode("");
    setEditingBookID(0);
  };

  const saveOrUpdateBook = async (e) => {
    e.preventDefault();
    try {
      if (editingBookID !== undefined) {
        var data = await updateBookAsync(editingBookID, {
          bookID: editingBookID,
          title,
          yearWritten,
          author,
          publisher,
          publishedDate,
          price,
          statusCode: statusCode,
        });

        if (data.result) {
          setShowModal(false);

          fetchBooks();
        }
      } else {
        var result = await insertBookAsync({
          title,
          yearWritten,
          author,
          publisher,
          publishedDate,
          price,
        });

        if (result.bookId > 0) {
          setShowModal(false);
          fetchBooks();
        }
      }
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const deleteBook = async (bookId) => {
    if (window.confirm("Estas seguro de eliminar este libro?")) {
      try {
        await deleteBookAsync(bookId).then(
          setBooks(books.filter((book) => book.bookID !== bookId))
        );
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div>
      <HeaderComponent />

      {/* Body */}
      <div className="container">
        <hr />
        <h1>Administración de Libros</h1>
        <hr />

        <div className="row align-items-center mb-3">
          <button className="btn btn-info col-md-1" onClick={showModalEvent}>
            Agregar
          </button>

          <h6 className="d-flex justify-content-end col-md-10 ms-5">
            Total: {books.length}
          </h6>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Año</th>
              <th scope="col">Escritor</th>
              <th scope="col">Editora</th>
              <th scope="col">Precio</th>
              <th scope="col">Fecha de publicación</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr
                key={book.bookID}
                style={{ cursor: "pointer" }}
                onClick={() => rowClick(book)}
              >
                <td>{book.title}</td>
                <td>{book.yearWritten}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>RD${book.price}</td>
                <td>{book.publishedDate}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="light"
                      className="btn btn-outline-info"
                      onClick={(e) => optionsClick(e, book, "edit")}
                      style={{ marginRight: "10px" }}
                    >
                      <img src={edit50} alt="Edit" width={20} />
                    </Button>
                    <Button
                      variant="light"
                      className="btn btn-outline-danger"
                      onClick={(e) => optionsClick(e, book, "delete")}
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
            {editingBookID ? "Editar cliente" : "Agregar nuevo cliente"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={saveOrUpdateBook}>
            <Form.Group controlId="formTitle">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYearWritten">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el año"
                value={yearWritten}
                onChange={(e) => setYearWritten(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Escritor/a</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el escritor/a"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Editor/a</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el editor/a"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPublishedDate">
              <Form.Label>Fecha de publicación</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de publicación"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
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
