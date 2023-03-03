import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from "./interface/pages/HomePage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}
