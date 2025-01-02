import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>hi</Layout>} />
        <Route path="/about" element={<Layout>hi from about</Layout>} />
        {/* <Route path="/contact" element={<Contact />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
