import React from 'react';
import { Card, CardGroup, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    // Es esencial que todo esté englobado en un div
    <div>
      <div className="Header">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#">Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <NavDropdown title="Submenu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="primary">Login</Button>
            {/* Pasar el buscador al lado derecho */}
            <Form inline className="navbar-nav ms-auto">
              <FormControl type="search" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="container">
        <div className="cartas">
          <CardGroup>
            <Card>
              <Card.Img height={"130px"} width={"233px"} variant="top" src="https://i.imgur.com/eoMMulu.png" alt="Card image cap" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img height={"130px"} width={"233px"} variant="top" src="https://i.imgur.com/eoMMulu.png" alt="Card image cap" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img height={"130px"} width={"233px"} variant="top" src="https://i.imgur.com/eoMMulu.png" alt="Card image cap" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
