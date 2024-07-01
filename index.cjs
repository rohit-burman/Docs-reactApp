// Express server setup
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors"); 
// import express from "express";
// import path from "path";
// import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Serve the React app's static files
// // app.use(express.static(path.join(__dirname, "/dist")));

// // API routes
// app.get("/", function (req, res) {
//   fs.readdir(`./files`, function (err, files) {

//     res.json({ files });
//   });
// });

// app.get("/files/:filename", function (req, res) {
//   fs.readFile(`./files/${req.params.filename}`, "utf-8", function (
//     err,
//     filedata
//   ) {
//     console.log(files)
//     res.json({ filedata });
//   });
// });

// // Serve React app for any other routes
// console.log(path.join(__dirname+"/dist/index.html"))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/dist/index.html"));
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// API route to fetch files data
app.get("/files", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading files");
    }
    res.json({ files });
  });
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.json({filedata});
      // res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

// Define a POST route to handle form submissions
app.post("/create", (req, res) => {
  // Extract form data from the request body
  const { desc, filesize, close, tag: { isOpen, tagTitle, tagColor }} = req.body;

  // Create a file name based on the current timestamp (for uniqueness)
  const fileName = `file_${Date.now()}.json`;

  // Create a file path
  const filePath = path.join(__dirname, "files", fileName);

  // Prepare data to write to the file
  const fileContent = JSON.stringify({
    description: desc,
    fileSize: filesize,
    close: close,
    tag: {
      isOpen: isOpen,
      tagTitle: tagTitle,
      tagColor: tagColor
    }
  }, null, 2);

  // Write data to the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Error saving data to file");
    } else {
      console.log("File saved successfully:", fileName);
      res.status(201).send(fileContent);
    
    }
  });
});



// Serve React app for other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
