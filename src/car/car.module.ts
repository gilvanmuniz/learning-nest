import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { MongooseModule } from '@nestjs/mongoose'
import { CarSchema } from './entities/car.schema';
import { CarController } from './car.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'car', schema:CarSchema }])],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
