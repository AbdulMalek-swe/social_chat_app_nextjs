"use client"

import CreateBlog from "./components/createBlog";
import ShowBlog from "./components/showBlog";

 
export default function Home() {
  return (
    <>
    {/* blog create  */}
      <CreateBlog/>
      {/* post  */}
      <ShowBlog/>
    </>
  );
}
