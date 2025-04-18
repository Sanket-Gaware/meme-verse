import "./App.css";
import RouteFile from "./RouteFile/RouteFile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouteFile />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
