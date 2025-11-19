import React from "react";
import { useNavigate } from "react-router-dom";

function TonnetzVisPage() {
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/upload");
  };

  return (
    <div>
      <h2>playback + tonnetz vis</h2>
      <button onClick={handleGenerate}>Upload a new song</button>
    </div>
  );
}
export default TonnetzVisPage;
