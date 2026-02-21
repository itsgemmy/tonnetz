import React from "react";
import { Routes, Route } from "react-router-dom";
import UploadSongPage from "./UploadSongPage";
import TonnetzVisPage from "./TonnetzVisPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadSongPage />} />
      <Route path="/upload" element={<UploadSongPage />} />
      <Route path="/visualization" element={<TonnetzVisPage />} />
    </Routes>
  );
}

export default App;
