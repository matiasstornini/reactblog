import { Routes, Route } from "react-router-dom";

import Blog from "./routes/Blog";
import Blog3 from "./routes/Blog3";
import Estadisticas from "./routes/Blog2";
import Error from "./routes/Error";

function Apps() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Error />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
      </Routes>
    </>
  );
}

export default Apps;
