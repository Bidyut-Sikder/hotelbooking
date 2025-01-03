import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>hi</Layout>} />
        <Route path="/about" element={<Layout>hi from about</Layout>} />
        {/* <Route path="/contact" element={<Contact />} />  */}

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
