import Feed from "~/features/feed";
import type { Route } from "../+types/root";
import { authClient } from "~/lib/auth-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const {data,error,isPending,refetch} = authClient.useSession()
  return <Feed/>
}
