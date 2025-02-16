import React from "react";

const BackgroundLayout = ({ backgroundImage, children }) => {
  const defaultBackgroundImage =
    "https://res.cloudinary.com/dp08vd3cy/image/upload/v1734259567/ctxvpiw3alojmz4stauy.webp";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${
          backgroundImage || defaultBackgroundImage
        })`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
