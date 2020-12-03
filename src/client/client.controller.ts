import { Body, Controller, Get, Injectable, Post, Put, Query, Logger, UsePipes, ValidationPipe, Delete, Param,} from '@nestjs/common';
import {  CreateClientDto } from './dtos/create-client.dto';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { ClientValidatorPipes } from './pipes/client-validator.pipes'
@Controller('/client')
export class ClientController {
    
    constructor(private readonly clientService:ClientService){}
    private readonly logger = new Logger(ClientService.name)
   
    @Get()
    async findClient( ClientValidatorPipes):Promise<Client[] | Client>{
        //  this.logger.log(email);
        //  if(email){
        //      return this.clientService.findClientByEmail(email);
        //  }
         
             return this.clientService.findClient();
        
    }
    @Get('/:_id')
    async findClientById(@Param('_id', ClientValidatorPipes) _id: String):Promise<Client[] | Client>{
         this.logger.log(_id);         
         return this.clientService.findClientById(_id);
                
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createClient(@Body() createClienteDto: CreateClientDto):Promise<Client>{
        return await this.clientService.createClient(createClienteDto);
    }
    
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizaClient(
        @Body() createClienteDto: CreateClientDto,
        @Param('_id',ClientValidatorPipes) _id: string):Promise<void>{             
                  
        await this.clientService.atualizar(_id, createClienteDto);
    }

    // @Delete()
    // async deleteClientByEmail(
    //     @Query('email',ClientValidatorPipes) email: String):Promise<void>{
    //     this.logger.log(email);
    //     return this.clientService.deleteByEmail(email);
    // }

    @Delete('/:_id')
    async deleteClientByEmail(
        @Param('_id',ClientValidatorPipes) _id: String):Promise<void>{
        this.logger.log(_id);
        return this.clientService.deleteById(_id);
    }

}

