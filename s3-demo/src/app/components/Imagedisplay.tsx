import React, { FC } from "react";
import Image from "next/image";

interface ImageDisplayProps {
  imageUrl: string | undefined;
}

const ImageDisplay: FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div>
      <h2>Image Display</h2>
      {imageUrl && (
        <div style={{ maxWidth: "100%", height: "auto" }}>
          <Image
            src={imageUrl}
            alt="Uploaded"
            layout="responsive"
            width={400} // Set a suitable width for your design
            height={300} // Set a suitable height for your design
          />
        </div>
      )}
    </div>
  );
};


export default ImageDisplay;