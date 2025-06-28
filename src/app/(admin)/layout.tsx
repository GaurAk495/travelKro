import MobileSideBar from "./component/MobileSideBar";
import SideBar from "./component/SideBar";

async function layout({ children }: { children: React.ReactNode }) {
  const user = {
    email: "example@gmail.com",
    name: "Example gaur",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652",
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideBar user={user} />
      <MobileSideBar user={user} />
      <div className="flex-1 overflow-y-auto bg-background-300">{children}</div>
    </div>
  );
}

export default layout;
