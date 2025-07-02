import RouteGuard from "@/components/RouteGuard";
import { UserProvider } from "@/context/UserContext";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <RouteGuard>{children}</RouteGuard>
    </UserProvider>
  );
}

export default layout;
