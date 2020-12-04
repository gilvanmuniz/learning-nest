import { IsNotEmpty } from 'class-validator'

export class CreateCarDto{

    @IsNotEmpty()
    marca: String;

    @IsNotEmpty()
    modelo: String;
    
    @IsNotEmpty()
    ano:String;

    @IsNotEmpty()
    color: String;

    @IsNotEmpty()
    placa:String

}