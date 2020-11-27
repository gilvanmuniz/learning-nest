import { Document } from 'mongoose'
export interface Client extends Document{
    // id: number;
    name:String;
    cellphone: String;
    email: String;
    monitoring: boolean;
}