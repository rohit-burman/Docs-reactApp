import React, { useState, useEffect } from "react";
import Background from "./components/background";
import Foreground from "./components/Foreground";
import Form from "./components/Form";
function App() {
  // const [files, setFiles] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/files")
  //     .then((response) => {
  //       if (response.data && response.data.files) {
  //         // Iterate over each file
  //         response.data.files.forEach((file) => {
  //           // Make a separate request for each file
  //           axios.get(`http://localhost:5000/files/${file}`)
  //             .then((fileResponse) => {
  //               // Handle response for each file
  //               // console.log(`Data for ${file}:`, fileResponse.data);
  //               // Here you can handle the data for each file, e.g., update state, etc.
  //             })
  //             .catch((error) => {
  //               console.error(`Error fetching data for ${file}:`, error);
  //             });
  //         });
  //         // Optionally, you can also update the state with the list of files
  //         setFiles(response.data.files);
  //       } else {
  //         console.error("No files data received from server");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching files:", error);
  //     });
  // }, []);


  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <Foreground />
      {/* <Form /> */}
    </div>
  );
}

export default App;
