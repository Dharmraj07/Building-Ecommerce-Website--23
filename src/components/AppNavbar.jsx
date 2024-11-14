import React, { useContext } from "react";
import { Button, Container, Navbar, Nav, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import AuthContext from "../redux/auth-context";

const AppNavbar = ({ toggleForm, showForm }) => {
  const totalItemCount = useSelector((state) => state.cart.totalItemCount);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = (e) => {
    e.preventDefault();
    authCtx.logout();
    navigate("/auth");
  };

  const handleStoreClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent default navigation to store
      navigate("/auth"); // Redirect to login page
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container className="justify-content-between">
          <Navbar.Brand as={NavLink} to="/" exact>
            The Generics
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/store" onClick={handleStoreClick}>
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={NavLink} to="/auth">
                Login
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-success"
              onClick={toggleForm}
              aria-label={showForm ? "Close Cart" : "Open Cart"}
              className="me-2 position-relative"
            >
              Cart
              {totalItemCount > 0 && (
                <Badge
                  bg="light"
                  text="dark"
                  className="position-absolute top-0 start-100 translate-middle"
                  pill
                >
                  {totalItemCount}
                </Badge>
              )}
            </Button>
            {isLoggedIn && (
              <Button
                variant="outline-danger"
                onClick={logoutHandler}
                aria-label="Logout"
              >
                Logout
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Conditional rendering for the Cart */}
      {showForm && <Cart onClose={toggleForm} />}
    </>
  );
};

export default AppNavbar;
