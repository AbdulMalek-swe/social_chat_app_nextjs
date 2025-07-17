"use cleint"

import CreateBlog from "./components/createBlog";
import ShowBlog from "./components/shoBlog";

 
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
