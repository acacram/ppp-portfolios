import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../Styles/create.css";
import { jwtDecode } from "jwt-decode";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Componente funcional que representa la página de creación de elementos.
 *
 * @component
 * @example
 * // Ejemplo de uso:
 * import Create from './Create';
 * const App = () => {
 *   return <Create />;
 * }
 */
const Create = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null); // Cambiado a null
  const [visible, setVisible] = useState(false);
  const [showTitleAlert, setShowTitleAlert] = useState(false); // Estado para controlar la visibilidad de la alerta del título
  const [showTextAlert, setShowTextAlert] = useState(false); // Estado para controlar la visibilidad de la alerta del texto
  const [showImageAlert, setShowImageAlert] = useState(false); // Estado para controlar la visibilidad de la alerta de la imagen
  const navigate = useNavigate();

/**
   * Maneja la creación de un nuevo elemento.
   *
   * @param {Object} e - Evento de formulario.
   * @returns {void}
   */
  const handleCreate = async (e) => {
    e.preventDefault();

    // Restablece las alertas antes de la validación
    setShowTitleAlert(false);
    setShowTextAlert(false);
    setShowImageAlert(false);

    let isValid = true;

    // Validar campos obligatorios individualmente
    if (!title) {
      setShowTitleAlert(true);
      isValid = false;
    }

    if (!text) {
      setShowTextAlert(true);
      isValid = false;
    }

    // Asumiendo que deseas validar que se haya seleccionado un archivo para la imagen
    if (!image) {
      setShowImageAlert(true);
      isValid = false;
    }

    // Si algún campo no es válido, detener la ejecución de la función
    if (!isValid) {
      return;
    }

    // Si llegamos aquí, todos los campos son válidos
    // Continuar con la lógica para enviar los datos...

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const formData = new FormData(); // Crea un objeto FormData para enviar archivos
      formData.append("title", title);
      formData.append("text", text);
      formData.append("visible", visible);
      formData.append("image", image); // Agrega la imagen al objeto FormData
      formData.append("userId", userId);

      const response = await fetch("http://localhost:5000/cards/createItem", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Envía el objeto FormData en lugar de JSON.stringify
      });

      if (response.ok) {
        navigate(-1);
        // const data = await response.json();
        // console.log(data.message);

        Toastify({
          text: "Item creado correctamente",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "info",
          position: "center",
          gravity: "top",
          top: "120px",
          offset: {
            x: 0,
            y: 45,
          },
          duration: 2000,
        }).showToast();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={8}>
            <Card className="cardCreate">
              <Card.Header>
                <h3 className="text-center">Crear</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleCreate}>
                  {/* Título */}
                  <Form.Group className="mb-3">
                    <Form.Label>Título:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Introduce el título"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {showTitleAlert && (
                      <Alert variant="danger" className="mt-2">
                        El título es obligatorio.
                      </Alert>
                    )}
                  </Form.Group>

                  {/* Texto */}
                  <Form.Group className="mb-3">
                    <Form.Label>Texto:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Introduce el texto"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    {showTextAlert && (
                      <Alert variant="danger" className="mt-2">
                        El texto es obligatorio.
                      </Alert>
                    )}
                  </Form.Group>

                  {/* Imagen */}
                  <Form.Group className="mb-3">
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImage(e.target.files[0] ? e.target.files[0] : null)}
                    />
                    {showImageAlert && (
                      <Alert variant="danger" className="mt-2">
                        La imagen es obligatoria.
                      </Alert>
                    )}
                  </Form.Group>

                  {/* Visibilidad */}
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Visibilidad"
                      checked={visible}
                      onChange={(e) => setVisible(e.target.checked)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success" block>
                    Crear
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Create;