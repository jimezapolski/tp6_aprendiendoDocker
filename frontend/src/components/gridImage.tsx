// gridImage.tsx
import React, { useEffect, useState } from "react";
import CardImage from "./cardImage";
import { getImagesUrlByProfile } from "../app/utils";

interface GridProps {
  profileId: number;
  handleOpenImage: (url: string) => void;
}

const GridImage: React.FC<GridProps> = ({ profileId, handleOpenImage }) => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getImagesUrlByProfile(profileId);
        setUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [profileId]);

  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 lg:p-6">
        {urls
          .slice()
          .reverse()
          .map((url, index) => (
            <CardImage
              key={index}
              url={url}
              onClick={() => handleOpenImage(url)}
            />
          ))}
      </div>
    </section>
  );
};

export default GridImage;
