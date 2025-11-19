import React from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function UploadSongPage() {
  const navigate = useNavigate();

  const handleGenerate = () => {
    // trigger generation logic here
    navigate("/visualization");
  };

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone(onDrop);
  //call useDropzone property getters are 2 functions that return objects with properties to create drag n drop zone

  return (
    <div>
      <div
        {...getRootProps()} // prop spreads onto div; handles drag-and-drop
        style={{ border: "2px dashed gray", padding: 20 }}
      >
        <input
          {...getInputProps()} // props spreads onto input; handles file selection when clicked
        />
        <p>Drop your MP4 here or click to select</p>
      </div>

      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default UploadSongPage;
