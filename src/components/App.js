import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";

// Private Route Component
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Home Page (Private)
function Home() {
  return (
    <div className="main-container">
      <h1>Code Playground</h1>
      <p>Welcome! You are viewing a protected route.</p>
    </div>
  );
}

// Login Page
function Login({ onLogin }) {
  return (
    <div className="main-container">
      <h1>Login Page</h1>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Home
          </Link>

          <Link to="/login">Login</Link>
        </nav>

        {/* Authentication Status */}
        <p>
          <strong>Status:</strong> {isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </p>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;