import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
