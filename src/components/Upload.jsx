"use client";

import Image from "next/image";
import { useState } from "react";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imgurl, setImgUrl] = useState(null);

  const submitImage = async (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("files", image);

    var requestOptions = { method: "POST", body: formdata };

    const response = await fetch("/api/image-upload/new", requestOptions);
    const result = await response.text();

    const url = JSON.parse(result);

    console.log(url);
    console.log(url?.res);
    setImgUrl(url?.res);
  };

  return (
    <>
      {imgurl && <Image src={imgurl} height={200} width={200} alt="Image" />}
      <form onSubmit={submitImage}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default Upload;
