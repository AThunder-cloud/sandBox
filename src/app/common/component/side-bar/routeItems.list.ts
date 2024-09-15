import { routeModel } from "../../models/route.model";
import { iconColor } from "../../gobal.const";

export const routeItemsList : routeModel[] = [
    {
        title:"First",
        icon:"edit_document",
        iconType: 'material-icons',
        path:'/',
        style: { color: iconColor },
        
    },
    {
        title:"second",
        icon:"water_drop",
        iconType: 'material-icons',
        path:"/feature/notes",
        style: { color: iconColor },
    },
    {
        title:"third",
        icon:"bolt",
        iconType: 'material-icons',
        path:'/',
        style: { color: iconColor },
    },
    {
        title:"fourth",
        icon:"eco",
        iconType: 'material-icons',
        path:"/",
        style: { color: iconColor },
    },
    {
        title:"fivth",
        icon:"severe_cold",
        iconType: 'material-icons',
        path:'/',
        style: { color: iconColor },
    },
    {
        title:"sixth",
        icon:"local_fire_department",
        iconType: 'material-icons',
        path:"/",
        style: { color: iconColor },
    },
    {
        title:"sevent",
        icon:"sports_esports",
        iconType: 'material-icons',
        path:"/feature/notes",
        style: { color: iconColor },
    },
    {
        title:"eight",
        icon:"hub",
        iconType: 'material-icons',
        path:"/feature/notes",
        style: { color: iconColor },
    }

    
]
