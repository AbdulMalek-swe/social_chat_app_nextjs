"use client";
import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Modal from "../ui/modal";
// import 'emoji-mart/css/emoji-mart.css'
const CreateBlog = () => {
  const [emojiState, setEmojiState] = useState("");
  const [color,setColor]=useState("")
  return (
    <div>
      <Modal>
        <textarea
          className="text-white text-center flex items-center h-56 justify-centery5htryh"
          value={emojiState || ""}
          onChange={(e) => setEmojiState(e.target.value)}
          style={{ 
            background:color
           }}
        />
        <Picker
          data={data}
          onEmojiSelect={(e) => setEmojiState((prev) => [prev + e.native])}
        />
        {/* color set  */}

        <div>
            <button className="text-red-900  w-12 h-8 rounded-lg " onClick={()=>setColor("red")}>red</button>
            <button  onClick={()=>setColor("green")}>green</button>
            <button onClick={()=>setColor("yellow")}>yellow</button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateBlog;
