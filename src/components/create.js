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

const Create = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null); // Cambiado a null
  const [visible, setVisible] = useState(false);
  const [showTitleAlert, setShowTitleAlert] = useState(false); // Estado para controlar la visibilidad de la alerta del título
  const [showTextAlert, setShowTextAlert] = useState(false); // Estado para controlar la visibilidad de la alerta del texto
  const [showImageAlert, setShowImageAlert] = useState(false); // Estado para controlar la visibilidad de la alerta de la imagen
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios individualmente
    if (!title) {
      setShowTitleAlert(true); // Mostrar alerta si el título está vacío
      return;
    }

    if (!text) {
      setShowTextAlert(true); // Mostrar alerta si el texto está vacío
      return;
    }

    if (!image) {
      setShowImageAlert(true); // Mostrar alerta si la imagen no está seleccionada
      return;
    }

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
          duration: 7000,
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
                {/* Alertas de Bootstrap para cada campo obligatorio */}
                {showTitleAlert && (
                  <Alert
                    variant="danger"
                    onClose={() => setShowTitleAlert(false)}
                    dismissible
                  >
                    El título es obligatorio.
                  </Alert>
                )}
                {showTextAlert && (
                  <Alert
                    variant="danger"
                    onClose={() => setShowTextAlert(false)}
                    dismissible
                  >
                    El texto es obligatorio.
                  </Alert>
                )}
                {showImageAlert && (
                  <Alert
                    variant="danger"
                    onClose={() => setShowImageAlert(false)}
                    dismissible
                  >
                    La imagen es obligatoria.
                  </Alert>
                )}
                <Form onSubmit={handleCreate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Título:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Texto:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Visibilidad"
                      checked={visible}
                      onChange={(e) => setVisible(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
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
