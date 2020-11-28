import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';



export class ClientValidatorPipes implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata){
       if(!value){
           throw new BadRequestException(`No value, the param ${metadata.data} need to be filled`);
       }
       return true;
    }
}