import { getUserRole } from "@/actions/authAction";
import MobileSideBar from "./component/MobileSideBar";
import SideBar from "./component/SideBar";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/UserContext";

async function layout({ children }: { children: React.ReactNode }) {
  const res = await getUserRole();
  if (!res) return redirect("/sign-in");
  if (res && res.role !== "admin") return redirect("/");

  const userInfo = {
    email: res.email,
    name: res.full_name,
    image: res.image_url,
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideBar user={userInfo} />
      <MobileSideBar user={userInfo} />
      <UserProvider user={userInfo}>
        <div className="flex-1 overflow-y-auto bg-background-300">
          {children}
        </div>
      </UserProvider>
    </div>
  );
}

export default layout;
