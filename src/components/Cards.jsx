import React from "react";
import { FiFileText } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

function Cards({ data , reference}) {
  console.log(data);
  return (
    <motion.div drag dragConstraints={reference} whileDrag={{scale:1.1}} dragElastic={0.2}  className="relative flex-shrink-0 w-60 h-72 rounded-[40px] bg-zinc-900/90 text-white p-5 overflow-hidden px-6 py-9">
      <FiFileText />
      <p className=" z-40 text-sm leading-tight mt-5 font-semibold">{data.description}</p>
      <div className="footer absolute bottom-0 w-full left-0 ">
        <div className="flex items-center justify-between py-3 px-8 mb-3">
          <h5>{data.fileSize} </h5>
          <span className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center">
            {data.close ? (
              <IoClose />
            ) : (
              <MdOutlineFileDownload size="0.9em" color="#fff" />
            )}
          </span>
        </div>
        {data.tag.isOpen && (
          <div
            className={`tag w-full p-4 ${
              data.tag.tagColor === "blue" ? "bg-blue-600" : data.tag.tagColor  === "green" ? "bg-green-600" : "bg-red-600"
            } flex justify-center items-center`} 
          >
            <h3 className="text-sm font-bold ">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Cards;
