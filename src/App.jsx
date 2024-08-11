import { Route, Routes } from "react-router-dom";
import { Default } from "./layouts/Default";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Default />}>
         <Route path="/" element={<Home />} />
        </Route>
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
