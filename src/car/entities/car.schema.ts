import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({

    marca:{
        type:String
    },
    modelo:{
        type:String
    },
    ano:{
        type:String
    },
    cor:{
        type:String
    },
    placa:{
        type:String,
        unique:true
    }
});