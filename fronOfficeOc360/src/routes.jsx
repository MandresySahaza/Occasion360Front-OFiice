import {
  PresentationChartBarIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import {  Annonce } from "@/pages/dashboard";
import { SignIn} from "@/pages/auth";
import Acceuil from "./pages/dashboard/acceuil";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <PresentationChartBarIcon {...icon} />,
        name: "Acceuil",
        path: "/acceuil",
        element: <Acceuil />,
        op: "",
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Annonce",
        path: "/annonce",
        element: <Annonce />,
        op: "",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },

    ],
  },
];

export default routes;
