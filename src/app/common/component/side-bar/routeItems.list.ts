import { routeModel } from "../../models/route.model";
import { iconColor } from "../../gobal.const";

export const routeItemsList : routeModel[] = [
   
    {
        title:"Home",
        icon: "pi pi-home", 
        iconType: 'pi', 
        path:'/',
        style: { color: iconColor },
        
    },
    {
        title:"Notes",
        icon: "pi pi-pencil", 
        iconType: 'pi', 
        path:'/feature/notes',
        style: { color: iconColor },
        
    }
    
]
