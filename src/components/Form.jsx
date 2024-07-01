// import React, { useState } from "react";
// import Cards from "./Cards";

// function form() {
//   // const data = [
//   //   {
//   //     desc: "English class notes of class 12 th CBSE",
//   //     filesize: "0.7mb",
//   //     close: false,
//   //     tag: { isOpen: true, tagTitle: "Upload", tagColor: "blue" },
//   //   },
//   // ];
//   const [data, setData] = useState([
//     {
//       desc: "",
//       filesize: "",
//       close: "",
//       tag: { isOpen: "", tagTitle: "", tagColor: "" },
//     },
//   ]);

//   const handelChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => {
//       return { ...prev, [name]: value };
//     });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   {
//   //     data.map((item) => <Cards data={item} />);
//   //   }
//   //   console.log(data);
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setData((prevData) => {
//       // Ensure prevData is an array
//       if (!Array.isArray(prevData)) {
//         prevData = [];
//       }
//       return [
//         ...prevData,
//         {
//           desc: data.desc,
//           filesize: data.filesize,
//           close: data.close,
//           tag: {
//             isOpen: data.tag.isOpen,
//             tagTitle: data.tag.tagTitle,
//             tagColor: data.tag.tagColor
//           }
//         }
//       ];
//     });
//     {data.map((item, index) => (
//       <Cards key={index} data={item} />
//     ))}
//   };

//   return (
//     <div className=" p-6 absolute z-[4] rounded-[30px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[40%] h-[60%] bg-zinc-200">
//       <form onSubmit={handleSubmit}>
//         <h3>Description</h3>{" "}
//         <textarea
//           cols="10"
//           rows="5"
//           name="desc"
//           onChange={handelChange}
//         ></textarea>
//         <h3>File Size</h3>{" "}
//         <input type="text" name="filesize" onChange={handelChange} />
//         <h3>Type</h3>{" "}
//         <input
//           type="text"
//           placeholder="true/false"
//           name="close"
//           onChange={handelChange}
//         />
//         <h3>tag </h3>
//         <input
//           type="text"
//           placeholder="true/false"
//           name="tag.isOpen"
//           onChange={handelChange}
//         />
//         <h3>tag title </h3>
//         <input
//           type="text"
//           placeholder=""
//           name="tag.tagTitle"
//           onChange={handelChange}
//         />
//         <h3>tag color </h3>
//         <input
//           type="text"
//           placeholder="green/blue"
//           name="tag.color"
//           onChange={handelChange}
//         />
//         <button type="submit">Create</button>
//       </form>

//     </div>
//   );
// }

// export default form;

import React, { useState } from "react";
import axios from "axios";

function Form({ show, addData }) {
  const [formData, setFormData] = useState({
    desc: "",
    filesize: "",
    close: "",
    tag: { isOpen: "", tagTitle: "", tagColor: "" },
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/create", {
      desc: formData.desc,
      filesize: formData.filesize,
      close: formData.close,
      tag: { isOpen: formData.tag.isOpen, tagTitle: formData.tag.tagTitle, tagColor: formData.tag.tagColor },
    });
    console.log("8888"+response.data)
    addData(response.data); // Update state with new data
  } catch (error) {
    console.error("Error adding data:", error);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("tag.")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tag: {
          ...prevFormData.tag,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:5000/create", formData);
  //     setFormData({
  //       desc: "",
  //       filesize: "",
  //       close: "",
  //       tag: { isOpen: "", tagTitle: "", tagColor: "" },
  //     });

  //   } catch (error) {
  //     console.error("Error creating file:", error);
  //   }
  // };

  return (
    show && (
      <div className="p-6  flex-col  flex absolute z-[5] rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[40%] h-[70%] bg-zinc-700 text-white">
        <form onSubmit={handleSubmit}>
          <h3>Description</h3>
          <textarea
            className=" rounded-sm w-full mb-3 border-none resize-none bg-zinc-500"
            cols="10"
            rows="5"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          ></textarea>
          <h3>File Size</h3>
          <input
            className=" rounded-sm w-full mb-3 border-none resize-none bg-zinc-500"
            type="text"
            name="filesize"
            value={formData.filesize}
            onChange={handleChange}
          />
          <h3>Tag Title</h3>
          <input
            className="rounded-sm w-full mb-3 border-none resize-none bg-zinc-500"
            type="text"
            placeholder="title"
            name="tag.tagTitle"
            value={formData.tag.tagTitle}
            onChange={handleChange}
          />
          <div className="dropdowns flex justify-between p-3">
            <div className="tag1">
              <h3>Tag</h3>
              <select
                className="mb-3 border-none resize-none bg-zinc-900 p-2 rounded-md"
                name="tag.isOpen"
                value={formData.tag.isOpen}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="true">Enable</option>
                <option value="false">Disable</option>
              </select>
            </div>
            <div className="tag2">
              <h3>Close</h3>
              <select
                className="mb-3  border-none resize-none bg-zinc-900 p-2 rounded-md"
                name="close"
                value={formData.close}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="tag3">
              <h3>Tag Color</h3>
              <select
                className="mb-3 border-none resize-none bg-zinc-900 p-2 rounded-md"
                name="tag.tagColor"
                value={formData.tag.tagColor}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
              </select>
            </div>
          </div>
          <div className=" flex justify-center items-center">

          <button
            className=" bg-blue-700 p-2 px-5 rounded-md  mt-[20px]  "
            type="submit"
            >
            Create
          </button>
            </div>
        </form>
      </div>
    )
  );
}

export default Form;
