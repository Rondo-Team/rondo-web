import { NavBar as NavBarUI } from "@/components/NavBar/NavBar";
import { getUserNavBarInfo } from "@/features/private/NavBar/queries/getUserNavBarInfo";

export const NavBar = async () => {
  const user = await getUserNavBarInfo();
  return <NavBarUI username={user?.username} name={user?.name} />;
};
