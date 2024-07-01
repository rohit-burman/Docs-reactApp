// FileDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FileDetails() {
  const { filename } = useParams();
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    // Fetch file data from the server when the component mounts
    axios.get(`/files/${filename}`).then((response) => {
      setFileData(response.data.filedata);
    });
  }, [filename]);

  return (
    <div>
      <h1>{filename}</h1>
      <pre>{fileData}</pre>
    </div>
  );
}

export default FileDetails;
