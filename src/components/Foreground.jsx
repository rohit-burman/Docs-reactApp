import Cards from "./Cards";
import React, { useRef, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import Form from "./Form";


function Foreground() {
  const ref = useRef(null);
  // const data = [
  //   {
  //     desc: "English class notes of class 12 th CBSE",
  //     filesize: "0.7mb",
  //     close: false,
  //     tag: { isOpen: true, tagTitle: "Upload", tagColor: "blue" },
  //   },
  //   {
  //     desc: "Progress report of all Semester ",
  //     filesize: "0.6mb",
  //     close: false,
  //     tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" },
  //   },
  //   {
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus.",
  //     filesize: "0.9mb",
  //     close: false,
  //     tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" },
  //   },
  // ];

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files");
        // const filesWithData = [];
        const files = response.data.files;

        const fileDataPromise = files.map(async (file) => {
          const fileResponse = await axios.get(
            `http://localhost:5000/files/${file}`
          );
          return JSON.parse(fileResponse.data.filedata);
        });

        // response.data.files.forEach(async (file) => {
        //   const fileResponse = await axios.get(
        //     `http://localhost:5000/files/${file}`
        //   );

        //   const fileData = JSON.parse(fileResponse.data.filedata);

        //   filesWithData.push(fileData);

        // });

        const filesWithData = await Promise.all(fileDataPromise);
        setData(filesWithData);
        // console.log("0000000", filesWithData);
      } catch (error) {
        console.error("Error fetching dataaaa:", error);
      }
    };

    fetchData();  
  }, []);
 
  const toggleForm=()=>{
    setShowForm(!showForm);
  };

  const addData =(newData)=>{
    setData([...data,newData])
  }
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 flex-wrap p-5"
    >
      <div className={`" absolute z-[4] bg-zinc-900 top-[5%] left-[95%] size-12 flex justify-center items-center rounded-full
       hover:scale-[120%] transition-all duration-100 transform  hover:bg-[salmon] ${showForm ? "rotate-45" : "" } "`} 
        onClick={toggleForm}>
        <IoIosAdd size="4rem" color="#E4E4E7" />
      </div>
      {/* {showForm && <Form addData={addData} />} */}
      <Form show={showForm} addData={addData} />
      {data.map((item) => {
        console.log("111 "+item)
        return <Cards data={item} reference={ref} />;
      })}
    </div>
  );
}

export default Foreground;
