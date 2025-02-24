import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const Root = () => {
  // this route element is the parent of 3 pages, so they all contain the navbar
  return (
    // if I want to add a footer, it will go under outlet
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route element={<Root />}>
            <Route index element={<Home />} />
            <Route path="/countries" />

            <Route path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
