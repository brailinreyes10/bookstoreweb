/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";

export default function HeaderComponent() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="container=fluid">
      <nav className="navbar navbar-light navbar-expand-lg bg-info">
        <a
          className="navbar-brand d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={goToHome}
        >
          <span className="ms-4 fs-3">El Rincón del Libro</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ms-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item text-black fs-4">
              <Link className="nav-link text-black fs-5" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item text-black fs-5">
              <Link className="nav-link text-black fs-5" to="/sale">
                Ventas realizadas
              </Link>
            </li>
            <li className="nav-item text-black fs-4 dropdown">
              <button
                className="nav-link text-black fs-5 dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Configuraciones
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/client">
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/book">
                    Libros
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
