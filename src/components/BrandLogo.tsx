import { cn } from "@/utils/cn";
import Image from "next/image";

function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={"/assets/icons/logo.svg"}
        alt="logo"
        width={30}
        height={10}
        className="h-auto"
      />
      <p className="font-bold text-2xl">TravelMaker</p>
    </div>
  );
}

export default BrandLogo;
