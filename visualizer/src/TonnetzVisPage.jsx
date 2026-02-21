import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TonnetzVisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { file, youtubeUrl, videoId } = location.state || {};

  return (
    <div className="visualization-page">
      <header>
        <h1>Tonnetz Visualization</h1>
        <button onClick={() => navigate("/")}>Upload a new song</button>
      </header>
      <main className="vis-main">
        <div className="vis-placeholder">
          <p>
            {videoId && (
              <>YouTube: {youtubeUrl || `Video ID: ${videoId}`}</>
            )}
            {file && !videoId && <>Audio file: {file.name}</>}
            {!file && !videoId && "No source selected — upload or paste a URL"}
          </p>
          <p className="vis-note">Tonnetz visualization will render here</p>
        </div>
      </main>
    </div>
  );
}

export default TonnetzVisPage;
