'use client'

import React, { useState, useEffect } from "react";
import ImageDisplay from "@/app/components/Imagedisplay";

const App = () => {
  const [imageUrls, setImageUrls] = useState([]);

  // 이미지 URL 목록 가져오기
  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const response = await fetch("/api/getImageUrl");
        const data = await response.json();
        if (data.success) {
          setImageUrls(data.imageUrls);
          // console.log(data.imageUrls)
        }
      } catch (error) {
        console.error("Error fetching image URLs", error);
      }
    }

    fetchImageUrls();
  }, []);

  return (
    <div>
      <h1>Display Images from Database</h1>
      {imageUrls.map((imageUrl, index) => (
        <ImageDisplay key={index} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default App;