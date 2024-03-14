import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/LogIn";


import SidebarUser from "./components/SidebarUser";
import HomeUser from "./pages/user/HomeUser";
import SearchBooksUser from "./pages/user/SearchBooksUser";
import FAQ from "./pages/user/FAQ";
import Setting from "./pages/user/Setting";


import SidebarAdmin from "./components/SidebarAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import SearchBooksAdmin from "./pages/admin/SearchBooksAdmin";
import AddUser from "./pages/admin/AddUser";
import IssueBookAdmin from "./pages/admin/IssueBookAdmin";


import SidebarSuperAdmin from "./components/SidebarSuperAdmin";
import HomeSuperAdmin from "./pages/superadmin/HomeSuperAdmin";
import BooksList from "./pages/superadmin/BooksList";
import ManageUser from "./pages/superadmin/ManageUser";
import IssueBookSuperAdmin from "./pages/superadmin/IssueBookSuperAdmin";

function App() {
  // dito nya tinatanggap yung bato ng handle submit
  const storedUserRole = localStorage.getItem('userRole');
  const [userRole, setUserRole] = useState(storedUserRole);

  // tas dito nireread na yung user role para ma set
  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  // Render sidebar and routes based on user role
  let sidebarComponent, routesComponent;
  
  if (userRole === "user") {
    sidebarComponent = <SidebarUser />;
    routesComponent = (
      <Routes>
        <Route path="/home-user" element={<HomeUser />} />
        <Route path="/search-books" element={<SearchBooksUser />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    );
  } else if (userRole === "admin") {
    sidebarComponent = <SidebarAdmin />;
    routesComponent = (
      <Routes>
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/search-books" element={<SearchBooksAdmin />} />
        <Route path="/create-accounts" element={<AddUser />} />
        <Route path="/books-issued" element={<IssueBookAdmin />} />
      </Routes>
    );
  } else if (userRole === "super-admin") {
    sidebarComponent = <SidebarSuperAdmin />;
    routesComponent = (
      <Routes>
        <Route path="/home-super-admin" element={<HomeSuperAdmin />} />
        <Route path="/books-list" element={<BooksList />} />
        <Route path="/manage-users" element={<ManageUser />} />
        <Route path="/books-issued" element={<IssueBookSuperAdmin />} />
      </Routes>
    );
  } else {
    // pabalik sa login 
    return (
      <Router>
        <Login handleLogin={handleLogin} />
      </Router>
    );
  }

  // ito na yung maglalabas ng logged in account depending sa role
  return (
    <Router>
      <div className="min-h-screen flex">
        {sidebarComponent}
        {routesComponent}
      </div>
    </Router>
  );
}

export default App;