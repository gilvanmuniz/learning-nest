import { Body, Controller, Get, Injectable, Post, Query, Logger, UsePipes, ValidationPipe, Delete,} from '@nestjs/common';
import {  CreateClientDto } from './dtos/create-client.dto';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { ClientValidatorPipes } from './pipes/client-validator.pipes'
@Controller('/client')
export class ClientController {
    
    constructor(private readonly clientService:ClientService){}
    private readonly logger = new Logger(ClientService.name)
    @Get()
    async findClient(@Query('email') email: String):Promise<Client[] | Client>{
         this.logger.log(email);
         if(email){
             return this.clientService.findClientByEmail(email);
         }
         else{
             return this.clientService.findClient();
         }
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createClient(@Body() createClienteDto: CreateClientDto):Promise<Client>{
        return await this.clientService.createClient(createClienteDto);
    }

    @Delete()
    async deleteClientByEmail(
        @Query('email',ClientValidatorPipes ) email: String):Promise<void>{
        
        return this.clientService.deleteByEmail(email);
    }

}

