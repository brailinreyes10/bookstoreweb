/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from "react";
import { getSalesAsync } from "../../domain/sale/saleRepository";
import HeaderComponent from "../headerComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PaginationComponent from "../paginationComponent";
import { formatToShortDate } from "../../utlis/utils";

export default function SaleComponent() {
  const location = useLocation();
  const [sales, setSales] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 10;

  const navigate = useNavigate();

  const { filtered } = location.state || {};

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const salesList = await getSalesAsync();

    const sortedSaleList = salesList.sort((a, b) =>
      b.create_dt.localeCompare(a.create_dt)
    );

    setSales(sortedSaleList);
  };

  const dateChange = (event) => {
    const selectedDate = event.target.value.split("T")[0];
    setFilterDate(selectedDate);
  };

  const rowClick = (sale) => {
    navigate("/saleDetail", { state: { sale } });
  };

  const filteredSales = sales.filter((sale) => {
    const saleDate = sale.saleDate.split("T")[0];

    if (!filtered) {
      return filterDate ? saleDate === filterDate : true;
    } else {
      const today = new Date().toISOString().split("T")[0];
      return saleDate === today;
    }
  });

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredSales.length / salesPerPage);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <HeaderComponent />

      {/* Go Back Button */}
      {filtered ? (
        <Button
          variant="info"
          style={{
            position: "absolute",
            left: "20px",
            top: "15%",
          }}
          onClick={goBack}
        >
          Atras
        </Button>
      ) : (
        ""
      )}
      {/* Go Back Button */}

      {/* Body */}
      <div className="container">
        <hr />
        <h1>
          {!filtered
            ? "Administración de Ventas"
            : "Ventas realizadas en el día"}
        </h1>
        <hr />
        <div className="container mt-4">
          <div className="row align-items-end mb-3">
            <label htmlFor="dateFilter" className="mb-2 fw-bold">
              Fecha:
            </label>
            <div className="col-md-2">
              {!filtered ? (
                <input
                  type="date"
                  id="dateFilter"
                  className="form-control fw-bold"
                  onChange={dateChange}
                />
              ) : (
                <input
                  type="text"
                  value={new Date().toISOString().split("T")[0]}
                  className="form-control fw-bold"
                  disabled
                />
              )}
            </div>

            <h6 className="d-flex justify-content-end col-md-9 ms-5">
              Total: {filteredSales.length}
            </h6>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha de venta</th>
              <th scope="col">Libros</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentSales.map((sale) => (
              <tr
                key={sale.saleID}
                onClick={() => rowClick(sale)}
                style={{ cursor: "pointer" }}
              >
                <td>{sale.clientName}</td>
                <td>{formatToShortDate(sale.saleDate)}</td>
                <td>{sale.countBook}</td>
                <td>{sale.total > 0 ? `$RD${sale.total}` : "-"}</td>
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
    </div>
  );
}
