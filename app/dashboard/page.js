import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

export const metadata = {
  title: "Mooddle ⋅ Dashboard",
  description: "Track your mood daily with Mooddle for mooddle",
};

export default function DashboardPage() {
  let children = <Dashboard />;
  return <Main>{children}</Main>;
}
