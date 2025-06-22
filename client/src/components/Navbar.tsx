import Signin from "@/auth/Signin";
import { ModeToggle } from "./MoodeToggle";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Lets Meet</div>
      <nav className="flex space-x-4">
        <Link  activeProps={{className:"bg-neutral-100 dark:bg-neutral-800  text-yellow-400"}} to="/">Home</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Signin />
      </div>
    </div>
  );
}
