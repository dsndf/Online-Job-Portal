import React, { ReactNode } from "react";

const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      {children}
    </div>
  );
};

export default AuthenticationLayout;
