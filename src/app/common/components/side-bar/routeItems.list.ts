import { routeModel } from "../../models/route.model";

export const routeItemsList : routeModel[] = [
   
    {
        title:"Home",
        icon: "pi pi-home", 
        iconType: 'pi', 
        path:'/',
    },
    {
        title:"Notes",
        icon: "pi pi-pencil", 
        iconType: 'pi', 
        path:'/feature/notes',
    },
    {
        title:"Physics",
        icon: "pi pi-cloud", 
        iconType: 'pi', 
        path:'/feature/physic',
    }
    
]
