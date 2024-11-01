import { routeModel } from "../../models/route.model";
import { iconColor } from "../../gobal.const";

export const routeItemsList : routeModel[] = [
   
    {
        title:"Home",
        icon: "pi pi-bookmark-fill", 
        iconType: 'pi', 
        path:'/',
        style: { color: iconColor },
        
    },
    {
        title:"First",
        icon: "pi pi-pencil", 
        iconType: 'pi', 
        path:'/',
        style: { color: iconColor },
        
    },
    {
        title:"second",
        icon: "pi pi-apple",  
        iconType: 'pi',
        path:"/feature/notes",
        style: { color: iconColor },
    },
    {
        title:"third",
        icon: "pi pi-bolt",
        iconType: 'pi',
        path:'/',
        style: { color: iconColor },
    },
    {
        title:"fourth",
        icon:"pi pi-send",
        iconType: 'pi',
        path:"/",
        style: { color: iconColor },
    },
    {
        title:"fivth",
        icon:"pi pi-code",
        iconType: 'pi',
        path:'/',
        style: { color: iconColor },
    },
    {
        title:"sixth",
        icon:"pi pi-discord",
        iconType: 'pi',
        path:"/",
        style: { color: iconColor },
    },
    {
        title:"seven",
        icon:"pi pi-instagram",
        iconType: 'pi',
        path:"/feature/notes",
        style: { color: iconColor },
    }

    
]
