import {IoMdNotifications, IoMdSettings} from "react-icons/io"
import {BsFillPersonFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"

export const navgationTabs = [
    {
        name: "Profile",
        value:"user/profile",
        icon: <BsFillPersonFill/>
    },
    {
        name: "Watch List",
        value:"user/watch-list",
        icon: <AiFillHeart/>
    },
    {
        name: "Notification",
        value:"user/notification",
        icon: <IoMdNotifications/>
    },
    {
        name: "Setting",
        value:"user/setting",
        icon: <IoMdSettings/>
    }

]