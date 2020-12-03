import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './dtos/create-client.dto'
import { Client } from './entities/client.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
    
    // private client:Client[] = [];
    constructor(@InjectModel('client') private readonly clientModel:Model<Client>) {}
    private readonly logger = new Logger(ClientService.name)

    async createClient(createClientDto:CreateClientDto):Promise<Client>{ 
        const { email } = createClientDto;
        //const clientFound = this.client.find(client => client.email === email);
        const clientFound = await this.clientModel.findOne({ email }).exec();

        if(clientFound){
           //return this.updateClient(clientFound, createClientDto);
           throw new BadRequestException(`Jogador com email ${email} já encontrado`)
        }
        else{
            const clientCriado = new this.clientModel(createClientDto);
            return await clientCriado.save();
        }

      //return this.criar(createClientDto);
      
    }

    async atualizar(_id:string, createClientDto:CreateClientDto):Promise<void>{
        const clientFound = await this.clientModel.findOne({_id}).exec();  
        if(!clientFound){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }   
        await this.clientModel.findOneAndUpdate({_id},
           {$set: createClientDto}).exec();
           
    }
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

    async findClientById(_id:String):Promise<Client>{        
        const clientFound = await this.clientModel.findOne({_id}).exec();           
        return await clientFound;        
    }

    async deleteByEmail(email):Promise<any>{
        this.logger.log(email);
        const clientFound = await this.clientModel.findOne({ email }).exec();
        if(!clientFound){
            return new NotFoundException(`Jogador com esse ${email} não encontrado`);
        } 
        return await this.clientModel.findOneAndDelete(email).exec();
        //return await this.clientModel.deleteOne({email}).exec();
    }
    async deleteById(_id):Promise<any>{
        this.logger.log(_id);
        const clientFound = await this.clientModel.findOne({ _id }).exec();
        if(!clientFound){
            return new NotFoundException(`Jogador com esse ${_id} não encontrado`);
        } 
        return await this.clientModel.findOneAndDelete(_id).exec();
        //return await this.clientModel.deleteOne({email}).exec();
    }
    
}
