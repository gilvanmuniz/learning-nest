import { Document } from 'mongoose'

export interface Car extends Document {
     marca: String;
     modelo:String;
     ano:String;
     cor:String;
     placa:String;
}