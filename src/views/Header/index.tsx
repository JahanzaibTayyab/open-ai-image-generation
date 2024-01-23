import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/icons/logo.svg";
const Header = () => (
  <header className="w-full flex justify-between items-center bg-white py-2 sm:px-8 px-4 border-b border-b-[#e6ebf4]">
    <Link href={"/"}>
      <Image src={logo} alt="logo" className="w-28 object-contain" />
    </Link>
    <Link
      href={"/create-post"}
      // className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
    >
      <Button>Create</Button>
    </Link>
  </header>
);

export default Header;
