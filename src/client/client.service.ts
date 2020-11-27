import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './dtos/create-client.dto'
import { Client } from './entities/client.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
    
    // private client:Client[] = [];
    constructor(@InjectModel('client') private readonly clientModel:Model<Client>) {}
    // private readonly logger = new Logger(ClientService.name)

    async createClient(createClientDto:CreateClientDto):Promise<Client>{ 
        const { email } = createClientDto;
        //const clientFound = this.client.find(client => client.email === email);
        const clientFound = await this.clientModel.findOne({ email }).exec();

        if(clientFound){
           //return this.updateClient(clientFound, createClientDto);
           throw new BadRequestException(`Jogador com email ${email} já encontrado`)
        } 

      return this.criar(createClientDto);
    }

    private async criar(CreateClientDto:CreateClientDto):Promise<Client>{
        
        const clientCriado = new this.clientModel(CreateClientDto);
        return await clientCriado.save();
        /*
        const { name, cellphone, email, monitoring } = CreateClientDto;
        const client:Client = {
            id: Math.floor(Math.random() * 100),
            name,
            cellphone,
            email,
            monitoring            
        }         
        this.client.push(client)
        this.logger.log(`CreateClientDto: ${JSON.stringify(CreateClientDto)}`);
        */
    }

    // private async updateClient(clientFound:Client, createClientDto:CreateClientDto):Promise<Client>{
        
    //     return await this.clientModel.findOneAndUpdate({email:createClientDto.email}, {$set:createClientDto}).exec();
       
    //     // const { name, cellphone, email, monitoring } = clientFound;
    //     // clientFound.name = createClientDto.name;
    //     // clientFound.cellphone = createClientDto.cellphone;
    //     // clientFound.email = createClientDto.email;
    //     // clientFound.monitoring = createClientDto.monitoring;
    // }

     async findClient():Promise<Client[]>{
         return await this.clientModel.find().exec();
        //return await this.client;
    }

    async findClientByEmail(email):Promise<Client>{
    const clientFound = await this.clientModel.findOne({ email }).exec();             
        if(!clientFound){
            throw new BadRequestException(`Jogador com email ${email} já encontrado`)
        }       
        return await clientFound;
    }

    async deleteByEmail(email):Promise<any>{
        //return await this.clientModel.findOneAndDelete(email).exec();
        return await this.clientModel.remove(email).exec();
    }
}
