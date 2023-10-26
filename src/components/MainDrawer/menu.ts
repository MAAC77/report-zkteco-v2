import { As } from "@chakra-ui/react";
import { MdDashboard, MdVerifiedUser } from "react-icons/md";

type MenuItem = {
  icon?: As<any> | undefined;
  text: string;
  href?: string;
  children?: MenuItem[];
};

export const menu: MenuItem[] = [
  {
    icon: MdDashboard,
    text: "Dashboard",
    href: "/",
  },
  {
    icon: MdVerifiedUser,
    href: "/me",
    text: "Profile",
  },
];
