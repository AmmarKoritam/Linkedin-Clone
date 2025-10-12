import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./pages/Layout";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        dispatch({ type: "set/user", payload: user ?? null });
      });

      return () => unsubscribe();
    },
    [dispatch]
  );

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
