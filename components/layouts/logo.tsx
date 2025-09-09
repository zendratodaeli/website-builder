import { Bungee } from "next/font/google";
import globe from "@/public/globe.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
});

const Logo = () => {
  return (
    <Link
      href={"/"}
      className={cn("flex gap-2 items-center", `${bungee.className} text-3xl`)}
    >
      <Image className="size-8" src={globe} alt="logo" />
      <span>W-Builder</span>
    </Link>
  );
};

export default Logo;