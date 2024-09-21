import Detail from "./pages/Detail/Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layouts/Header/Header";
import Search from "./pages/search/Search";
import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
