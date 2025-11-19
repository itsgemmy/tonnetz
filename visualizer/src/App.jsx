import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadSongPage from "./UploadSongPage";
import TonnetzVisPage from "./TonnetzVisPage";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<UploadSongPage />} />
      <Route path="/visualization" element={<TonnetzVisPage />} />
      <Route path="/upload" element={<UploadSongPage />} />
    </Routes>
  );
}

export default App;
