import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import History from "./pages/History";

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
