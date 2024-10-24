import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

const MobileRoutes = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
          <Menu />
      </SheetTrigger>
      <SheetContent className="bg-white p-0" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileRoutes;
