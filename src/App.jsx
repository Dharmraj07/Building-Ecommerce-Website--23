import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Application Components
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Cart from "./components/Cart";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./redux/auth-context";

function App() {
  const authCtx=useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
    console.log("redirect to login page");
    navigate("/auth"); // Redirect to login page
    }



  },[])






  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prevState) => !prevState);

  return (
    <>
      {/* Navbar with Form toggle */}
      <AppNavbar toggleForm={toggleForm} showForm={showForm} />

      {/* Welcome Section */}
      <Container className="my-5">
        <Card className="text-center p-4 bg-light">
          <Card.Body>
            <Card.Title>
              <h1>Welcome to The Generics</h1>
            </Card.Title>
            <Card.Text>Explore our products and shop now!</Card.Text>
          </Card.Body>
        </Card>
      </Container>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn && <Route path="/store" element={<Store />} />}
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage/>} />
      </Routes>

      {/* Conditional Rendering for Cart */}
      {showForm && <Cart onClose={toggleForm} />}
    </>
  );
}

export default App;
