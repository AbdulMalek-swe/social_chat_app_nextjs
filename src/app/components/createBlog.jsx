"use client";
import React, { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Modal from "@/components/ui/modal";
import { useCreateBlogMutation } from "@/network/blogApi";
// import 'emoji-mart/css/emoji-mart.css'
const CreateBlog = () => {
  const [createBlog, { data, isError, error }] = useCreateBlogMutation();
  const [color, setColor] = useState("");
  const [emojiState, setEmojiState] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const editableRef = useRef(null);
  const insertEmoji = (emoji) => {
    const el = editableRef.current;
    if (!el) return;
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const emojiNode = document.createTextNode(emoji);
    range.insertNode(emojiNode);
    // Move caret after emoji
    range.setStartAfter(emojiNode);
    range.setEndAfter(emojiNode);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  const blogSubmit = () => {
    console.log(editableRef?.current?.innerText);
    createBlog({
      blog: editableRef?.current?.innerText,
    });
  };
  return (
    <div className="">
      <Modal>
        <div className="w-full flex items-center justify-center">
          <div
            style={{ backgroundColor: color }}
            className="w-[90%] md:w-[500px] h-[300px] rounded-lg p-4 flex items-center justify-center relative"
          >
            {/* Custom Placeholder */}
            {emojiState === "" && (
              <div
                className="absolute text-white text-center w-full px-4 text-2xl opacity-50 pointer-events-none"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                What's on your mind?
              </div>
            )}

            {/* Editable Content */}
            <div
              contentEditable
              ref={editableRef}
              className="text-white text-center w-full h-full outline-none overflow-auto text-2xl leading-snug flex items-center justify-center flex-col"
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
              onInput={(e) => {
                const el = editableRef.current;
                setEmojiState(el.innerText);
                if (el) {
                  el.scrollTop = el.scrollHeight;
                }
              }}
            ></div>
          </div>
        </div>

        {/* Emoji Picker */}

        <div className="relative mt-2 flex gap-3 items-center justify-center">
          <button
            className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
            onClick={() => setShowPicker((prev) => !prev)}
          >
            😀
          </button>
          {showPicker && (
            <div className="absolute bottom-6">
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  insertEmoji(e.native);
                  //   setShowPicker(false);
                }}
                theme="light"
              />
            </div>
          )}
        </div>
        {/* Color Options */}
        <div className="mt-4 flex gap-2 justify-center">
          {["red", "green", "yellow", "blue", "purple"].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 ${
                color === c ? "border-white" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </Modal>
      <button onClick={blogSubmit}>submit </button>
    </div>
  );
};

export default CreateBlog;
