import { useGetBlogQuery } from "@/network/blogApi";
import React from "react";

const ShowBlog = () => {
  const { data, isLoading, isError, isSuccess } = useGetBlogQuery();
console.log(data?.data);
if(isLoading)return<>loading...</>
  return (
    <section>
      <div className="flex flex-col">
        {
            data?.data?.data?.map((item,idx)=><h1 key={idx}>{item?.blog}</h1>)
        }
      </div>
    </section>
  );
};

export default ShowBlog;
