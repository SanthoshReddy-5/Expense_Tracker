import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut, LuLandmark } from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/Dashboard"
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/Income"
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/Expense"
    },
    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "logout"
    },
];