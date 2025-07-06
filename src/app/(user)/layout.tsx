import React from "react";
import SideBar from "../admin/component/SideBar";
import MobileSideBar from "../admin/component/MobileSideBar";
import PayPalProvider from "@/utils/paypal/PayPalProvider";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideBar />
      <MobileSideBar />
      <div className="w-full overflow-y-auto bg-background-300">
        <PayPalProvider>{children}</PayPalProvider>
      </div>
    </div>
  );
}

export default layout;
