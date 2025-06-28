import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function page() {
  return (
    <div>
      <Link href="/sign-in">
        <Button>LoginPage</Button>
      </Link>
      <Link href="/dashboard">
        <Button>DashBoard</Button>
      </Link>
    </div>
  );
}

export default page;
