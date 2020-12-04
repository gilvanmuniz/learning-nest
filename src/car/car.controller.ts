import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './cardto/creatte-car.dto';
import { Car } from './entities/car.entity'

@Controller('/car')
export class CarController {

    constructor(private readonly carService:CarService){}

    @Get()
    async findCar():Promise<Car[]>{
        return await this.carService.findCar();
    }
    @Get('/:placa')
    async findCarByPlaca(@Param() placa:String):Promise<Car>{
        console.log(placa)
        return await this.carService.findByPlaca(placa);
    }

    @Post()
    async createCar(@Body() createCarDto:CreateCarDto):Promise<Car>{
        return await this.carService.createCar(createCarDto);
    }

    @Put('/:placa')
    async atualizar(@Param() placa:String, @Body() createCarDto:CreateCarDto):Promise<void>{
        await this.carService.atualizarCar(placa, createCarDto);
    }

    @Delete('/:placa')
    async deletar(@Param() placa:string):Promise<void>{
        await this.carService.deletarCar(placa);
    }

}
