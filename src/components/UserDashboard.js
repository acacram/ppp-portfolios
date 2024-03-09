import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrash,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/user.css";

/**
 * Componente funcional que representa el panel de control del usuario.
 *
 * @component
 * @example
 * // Ejemplo de uso:
 * import UserDashboard from './UserDashboard';
 * const App = () => {
 *   return (
 *     <div>
 *       {/* Otras partes de la aplicación *\/}
 *       <UserDashboard />
 *     </div>
 *   );
 * }
 */
const UserDashboard = () => {
  const [cards, setCards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  /**
   * Formatea la fecha de publicación de la nota.
   * @function
   * @param {string} dateString - La cadena de fecha a formatear.
   * @returns {string} - La cadena formateada que representa la diferencia de días.
   */
  function formatPublishedDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Publicado hoy";
    } else if (diffDays === 1) {
      return "Publicado hace 1 día";
    } else {
      return `Publicado hace ${diffDays} días`;
    }
  }

  // Importa datos de la base de datos al montar el componente
  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/cards/getItem/" + localStorage.getItem("token")
        );
        const data = await response.json();
        //console.log("Data:", data.items); // Verifica los datos en la consola
        const items = data.items;
        setCards(Array.isArray(items) ? items : []); // Asegurarse de que data sea un array antes de establecer el estado
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromDatabase();
  }, []);

  return (
    <>
      <Header setSearchTitle={setSearchTitle} />
      <Container className="w-100 h-100 no-select">
        <Container fluid className="text-primary p-4">
          <Row className="d-flex justify-content-center align-items-stretch py-4">
            {/* Columna para notas públicas */}
            <Col className="bg-secondary" xs={12} lg={6}>
              <h3 className="titulonota">
                Notas Públicas{" "}
                <FontAwesomeIcon
                  icon={faEye}
                  className="edit-icon me-2"
                  size="1x"
                />
              </h3>
              <Row xs={3} className="g-4">
                {cards.map(
                  (card, index) =>
                    card.visible === true && (
                      <Col
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Card
                          className="cardUser full-card border-0 rounded-3 px-3 py-2"
                          style={{ width: "100px" }}
                        >
                          <img
                            className="card-image rounded-3"
                            src={card.image}
                            alt=""
                          />
                          <h6 className="mt-2 overflow-ellipsis">
                            {card.title}
                          </h6>
                          <p className="card-text text-center">{card.text}</p>
                          <p className=" border-2 border border-black p-1 rounded-4">
                            {formatPublishedDate(card.date)}
                          </p>
                          <div className="d-flex justify-content-between mt-2">
                            <FontAwesomeIcon
                              icon={faPenSquare}
                              className="edit-icon me-1"
                              size="1x"
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="trash-icon"
                              size="1x"
                            />
                          </div>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>
            {/* Columna para notas privadas */}
            <Col className="bg-dark" xs={12} lg={6}>
              <h3 className="titulonota">
                Notas Privadas{" "}
                <FontAwesomeIcon
                  icon={faLock}
                  className="edit-icon me-2"
                  size="1x"
                />
              </h3>
              <Row xs={3} className="g-4">
                {cards.map(
                  (card, index) =>
                    card.visible === false && (
                      <Col
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Card
                          className="cardUser full-card border-0 rounded-3 px-3 py-2"
                          style={{ width: "100px" }}
                        >
                          <img
                            className="card-image rounded-3"
                            src={card.image}
                            alt=""
                          />
                          <h6 className="mt-2 overflow-ellipsis">
                            {card.title}
                          </h6>
                          <p className="card-text text-center">{card.text}</p>
                          <p className=" border-2 border border-black p-1 rounded-4">
                            {new Date(card.date).toISOString().split("T")[0]}
                          </p>
                          <div className="d-flex justify-content-between mt-2">
                            <FontAwesomeIcon
                              icon={faPenSquare}
                              className="edit-icon me-1"
                              size="1x"
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="trash-icon"
                              size="1x"
                            />
                          </div>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default UserDashboard;
