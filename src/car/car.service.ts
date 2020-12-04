import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './cardto/creatte-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
    constructor(@InjectModel('car') private readonly carModel:Model<Car>){}

    async createCar(createCarDto:CreateCarDto):Promise<Car>{
        const { placa } = createCarDto;
        const carFound = await this.carModel.findOne({ placa }).exec();

        if(carFound){
            throw new BadRequestException(`O Carro com a placa ${placa} já está cadastrado`);
        }
        const newcar =  new this.carModel(createCarDto);
        return await newcar.save();
    }

    async findCar():Promise<Car[]>{
        const newcar = await this.carModel.find().exec();
        return newcar;
    }

    async findByPlaca(placa:String):Promise<Car>{        
        if(!placa){
            throw new BadRequestException(`Não encontramos carro com a placa ${placa}`)
        }
        const carFound = await this.carModel.findOne(placa).exec()
        return carFound;
    }

    async atualizarCar(placa:String, createCarDto:CreateCarDto):Promise<void>{
        if(!placa){
            throw new BadRequestException(`Não encontramos carro com a placa ${placa}`)
        }
        this.carModel.findOneAndUpdate(placa, createCarDto).exec();
    }

    async deletarCar(placa:String):Promise<void>{
        this.carModel.findOneAndDelete(placa).exec();
    }
}
