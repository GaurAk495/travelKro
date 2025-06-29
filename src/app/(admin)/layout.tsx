import { redirect } from "next/navigation";
import { getUser } from "../actions/authServer";
import MobileSideBar from "./component/MobileSideBar";
import SideBar from "./component/SideBar";
// import { createAdminClient } from "@/utils/appwrite/NodeAppwriteClients";

async function layout({ children }: { children: React.ReactNode }) {
  const res = await getUser();
  if (!res) return redirect("/sign-in");
  if (res && res.role !== "admin") return redirect("/");

  // const {user} = await createAdminClient()

  const userInfo = {
    email: res.email,
    name: res.name,
    image: res.image_url,
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideBar user={userInfo} />
      <MobileSideBar user={userInfo} />
      <div className="flex-1 overflow-y-auto bg-background-300">{children}</div>
    </div>
  );
}

export default layout;
