import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        {/* Define application routes */}
         <Route path="/" element={<Layout></Layout>} />
        <Route path="/about" element={<>hi from about</>} />
        {/* <Route path="/contact" element={<Contact />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
