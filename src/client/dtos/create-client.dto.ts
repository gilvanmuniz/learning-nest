import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto{

  @IsNotEmpty()
  name: String;

  cellphone:String;
  
  @IsEmail()
  email: String;

  monitoring:boolean;
}