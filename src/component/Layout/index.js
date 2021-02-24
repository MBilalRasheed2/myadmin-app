import { Container, Row, Col,Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header";
import './style.css'
const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <Nav.Item>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </Nav.Item>
                </li>
                <li>
                  <Nav.Item>
                    <Link to="/page" className="nav-link">
                     Page
                    </Link>
                  </Nav.Item>
                </li>
                <li>
                  <Nav.Item>
                    <Link to="/product" className="nav-link">
                      Product
                    </Link>
                  </Nav.Item>
                </li>
                <li>
                  <Nav.Item>
                    <Link to="/order" className="nav-link">
                      Order
                    </Link>
                  </Nav.Item>
                </li>
                <li>
                  <Nav.Item>
                    <Link to="/category" className="nav-link">
                      Category
                    </Link>
                  </Nav.Item>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto" ,paddingTop:"60px"}}>
              
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </div>
  );
};

export default Layout;
