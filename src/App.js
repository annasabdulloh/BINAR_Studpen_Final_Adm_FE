import React from 'react'
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
// import AdminDaftarUser1 from "./pages/AdminDaftarUser1";
import AdminTiketTerjual from "./pages/AdminTiketTerjual";
import AdminTambahTiket from "./pages/AdminTambahTiket";
import AdminDataTransfer from "./pages/AdminDataTransfer";
import AdminTiketTersedia from "./pages/AdminTiketTersedia";
// import TiketTersedia from "./pages/TiketTersedia";
// import TiketTerjual from "./pages/TiketTerjual";
import { useEffect } from "react";
import MainFrame from "./components/MainFrame";
import UserContent from "./pages/UserContent";
import Login from './pages/Login'
import Logout from './components/Logout';
import { ProtectedRoute } from "./components/Protected";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/admin-tiketterjual":
        title = "";
        metaDescription = "";
        break;
      case "/admin-tambahtiket1":
        title = "";
        metaDescription = "";
        break;
      case "/admin-datatransfer1":
        title = "";
        metaDescription = "";
        break;
      case "/admin-tikettersedia1":
        title = "";
        metaDescription = "";
        break;
      case "/ii":
        title = "";
        metaDescription = "";
        break; 
      case "/i":
        title = "";
        metaDescription = "";
        break; 
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<ProtectedRoute><MainFrame ><UserContent/></MainFrame></ProtectedRoute>} />
      {/* <Route path="/i" element={<ProtectedRoute><MainFrame ><TiketTerjual/></MainFrame></ProtectedRoute>} />
      <Route path="/ii" element={<ProtectedRoute><MainFrame ><TiketTersedia/></MainFrame></ProtectedRoute>} /> */}

      <Route path="/admin-tiketterjual" element={<ProtectedRoute><MainFrame ><AdminTiketTerjual/></MainFrame></ProtectedRoute>} />

      <Route path="/admin-tambahtiket1" element={<ProtectedRoute><MainFrame ><AdminTambahTiket/></MainFrame></ProtectedRoute>} />
      <Route path="/admin-tikettersedia1" element={<ProtectedRoute><MainFrame ><AdminTiketTersedia/></MainFrame></ProtectedRoute>} />
      <Route path="/admin-datatransfer1" element={<ProtectedRoute><MainFrame ><AdminDataTransfer/></MainFrame></ProtectedRoute>} />
      <Route path='/logout' element={<ProtectedRoute><Logout></Logout></ProtectedRoute>} />
      {/* <Route path="/admin-tambahtiket1" element={<AdminTambahTiket />} />

      <Route path="/admin-datatransfer1" element={<AdminDataTransfer />} />

      <Route path="/admin-tikettersedia1" element={<AdminTiketTersedia />} /> */}
    </Routes>
  );
}
export default App;
