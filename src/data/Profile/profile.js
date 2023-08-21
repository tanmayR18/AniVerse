import {IoMdNotifications, IoMdSettings} from "react-icons/io"
import {BsFillPersonFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"

export const profileData = [
    {
        "name": "Profile",
        "value": "profile",
        "icon" : <BsFillPersonFill size={20}/>
    },
    {
        "name": "Watch List",
        "value": "watch-list",
        "icon" : <AiFillHeart size={20}/>
    },
    {
        "name": "Notification",
        "value": "notification",
        "icon": <IoMdNotifications size={20}/>
    },
    {
        "name": "Settings",
        "value": "setting",
        "icon": <IoMdSettings size={20}/>
    },
]