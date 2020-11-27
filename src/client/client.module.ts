import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './entities/cliente.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'client', schema:ClientSchema}])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
