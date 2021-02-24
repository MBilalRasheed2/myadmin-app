import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(logout());
  };
  const ifUserLoggedIn = () => {
    return (
      <Nav>
        <Nav.Item style={{ color: "white" }} onClick={logoutHandler}>
          Signout
        </Nav.Item>
      </Nav>
    );
  };
  const ifUserIsNotLoggedIn = () => {
    return (
      <Nav>
        <Nav.Item>
          <Link to="signin" className="nav-link" >
            Signin
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="signup" className="nav-link">
            Signup
          </Link>
        </Nav.Item>
      </Nav>
    );
  };
  return (
    <Navbar collapseOnSelect fixed="top" bg="dark" variant="dark" style={{zIndex:1}}  >
      <Container fluid>
        <Nav className="mr-auto"> 
          <Link to="/">
            {" "}
            <Navbar.Brand>Admin App</Navbar.Brand>
          </Link>
        </Nav>
        {auth.authenticate ? null : ifUserIsNotLoggedIn()}
        {auth.authenticate ? ifUserLoggedIn() : null}
      </Container>
    </Navbar>
  );
}

export default Header;
