import React from "react";
import {Roboto } from "next/font/google";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const Logo = () => {
  return (
    <div className={`${font.className} bg-background px-6 z-10`}>
      <h1 className="text-2xl tracking-wide font-semibold">NextHire</h1>
    </div>
  );
};

export default Logo;
