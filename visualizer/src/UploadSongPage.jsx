import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function UploadSongPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".ogg", ".flac"],
    },
    maxFiles: 1,
  });

  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = youtubeUrl.trim();
    const vid = url ? getVideoId(url) : null;
    if (file || vid) {
      navigate("/visualization", {
        state: { file: file || null, youtubeUrl: url || null, videoId: vid },
      });
    }
  };

  const handleYoutubeSubmit = () => {
    const vid = getVideoId(youtubeUrl);
    if (vid) {
      navigate("/visualization", { state: { videoId: vid, youtubeUrl } });
    }
  };

  return (
    <div className="upload-page">
      <header>
        <h1>Tonnetz AI</h1>
        <p>Map songs to their chord orientation on Euler&apos;s Tonnetz</p>
      </header>

      <main>
        <section className="upload-section">
          <h2>Upload a song</h2>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>
                {isDragActive
                  ? "Drop the audio file here..."
                  : "Drag & drop an audio file, or click to select"}
              </p>
            )}
          </div>
        </section>

        <section className="divider">
          <span>or</span>
        </section>

        <section className="youtube-section">
          <h2>Paste a YouTube URL</h2>
          <div className="youtube-input">
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <button type="button" onClick={handleYoutubeSubmit}>
              Visualize
            </button>
          </div>
        </section>

        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={!file && !youtubeUrl.trim()}>
            Continue to visualization
          </button>
        </form>
      </main>
    </div>
  );
}

export default UploadSongPage;
