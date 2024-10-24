import React from "react";
import { Acme } from "next/font/google";

const acme = Acme({
  subsets: ["latin"],
  weight: "400",
});

const Logo = () => {
  return (
    <div className={`${acme.className} px-6`}>
      <h1 className="text-4xl   text-purple-700">Hire</h1>
    </div>
  );
};

export default Logo;
