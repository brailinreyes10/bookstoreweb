import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../headerComponent";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getSaleDetailsBySaleIdAsync } from "../../domain/sale/saleRepository";
import { formatToShortDate } from "../../utlis/utils";

export default function SaleDetailComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sale } = location.state;

  const [saleDetails, setSaleDetails] = useState([]);

  useEffect(() => {
    fetchSalesDetails();
  });

  const fetchSalesDetails = async () => {
    const saleDetailsList = await getSaleDetailsBySaleIdAsync(sale.saleID);

    setSaleDetails(saleDetailsList);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <HeaderComponent />

      {/* Body */}
      <Button
        variant="info"
        style={{
          position: "absolute",
          left: "20px",
          top: "16%",
        }}
        onClick={goBack}
      >
        Atras
      </Button>
      <div className="container">
        <hr />
        <h1>Detalle de la venta:</h1>

        <hr />
        <div className="row mt-4 shadow mb-5">
          <div className="col-md-3">
            <p style={{ fontSize: "22px" }}>
              <strong>Cliente:</strong> {sale.clientName}
            </p>
          </div>
          <div className="col-md-4">
            <p style={{ fontSize: "22px" }}>
              <strong>Fecha de Venta:</strong>{" "}
              {formatToShortDate(sale.saleDate)}
            </p>
          </div>
          <div className="col-md-4">
            <p style={{ fontSize: "22px" }}>
              <strong>Total gastado: </strong>$RD {sale.total}
            </p>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titulo del Libro</th>
              <th scope="col">Escritor</th>
              <th scope="col">Precio de Venta</th>
            </tr>
          </thead>
          <tbody>
            {saleDetails.map((saleDetail) => (
              <tr key={saleDetail.saleDetailID} style={{ cursor: "pointer" }}>
                <td>{saleDetail.bookName}</td>
                <td>{saleDetail.author}</td>
                <td>$RD{saleDetail.salePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Body */}
    </div>
  );
}
