
import { Category } from "./category";
import { Priorities } from "./priorities";
import { User } from "./user";

 export class Todo { 
    id?: string | null = "";
    title?: string = "";
    description?: string = "";
    createdDate?: string = "";
    dueDate?: string ="";
    priority?: Priorities; 
    category?: Category; 
    user?: User;
    IsCompleted?: boolean;
    
}