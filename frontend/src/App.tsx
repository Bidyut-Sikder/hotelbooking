import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./context/AppContext";
import AddHotel from "./pages/AddHotel";

function App() {
  const {isLoggedIn}=useAppContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>hi</Layout>} />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {/* <Route path="/contact" element={<Contact />} />  */}

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {isLoggedIn&&(
            <Route 
            path="/my-hotels"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        )}    
          


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
