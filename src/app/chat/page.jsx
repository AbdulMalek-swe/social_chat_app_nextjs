"use client"
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useFormik } from "formik";
import * as Yup from "yup";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [messages, setMessages] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      message: Yup.string().required("Message cannot be empty"),
    }),
    onSubmit: (values, { resetForm }) => {
      socket.emit("send_message", values);
      resetForm({ values: { ...values, message: "" } });
    },
  });

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">💬 Live Chat</h1>
      <div className="border h-96 overflow-y-auto rounded p-3 bg-gray-50 shadow-inner mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 p-2 rounded bg-white border shadow-sm">
            <strong className="text-blue-500">{msg.name}:</strong>{" "}
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}

        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          value={formik.values.message}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        {formik.touched.message && formik.errors.message && (
          <p className="text-red-500 text-sm">{formik.errors.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
