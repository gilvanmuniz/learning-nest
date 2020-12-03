import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Console } from 'console';

export class ClientValidatorPipes implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata){
        //console.log(value)
       if(!value){
           throw new BadRequestException(`No value, the param ${metadata.data} need to be filled`);

       }
       return value;
    }
}