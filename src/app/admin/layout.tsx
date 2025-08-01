import SideBar from "./component/SideBar";
import MobileSideBar from "./component/MobileSideBar";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideBar />
      <MobileSideBar />
      <div className="w-full overflow-y-auto bg-background-300">{children}</div>
    </div>
  );
}

export default layout;
