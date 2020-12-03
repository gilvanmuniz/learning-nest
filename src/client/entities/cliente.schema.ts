import { timeStamp } from 'console';
import * as mongoose from 'mongoose';


export const ClientSchema = new mongoose.Schema({         
        name:{
            type:String
        },
        cellphone:{
            type:String,            
        }, 
        email:{
            type:String,
            unique:true
        }, 
        monitoring:{
            type:Boolean
        } 
 
}, {timestamps:true, collection:'client'});


exports.modules = ClientSchema;