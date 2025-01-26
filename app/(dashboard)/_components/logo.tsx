import React from "react";
import { Acme } from "next/font/google";

const acme = Acme({
  subsets: ["latin"],
  weight: "400",
});

const Logo = () => {
  return (
    <div className={`${acme.className} bg-background px-6 z-10`}>
      <h1 className="text-3xl  text-blue-600 dark:text-blue-400">NextHire</h1>
    </div>
  );
};

export default Logo;
