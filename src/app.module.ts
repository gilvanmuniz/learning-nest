import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ClientModule } from './client/client.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [ ClientModule,  CarModule,
    MongooseModule.forRoot(
      'mongodb+srv://gilvan:gr007879@cluster0.ikllp.mongodb.net/checklist?retryWrites=true&w=majority'
      , { 
        useNewUrlParse:true,
        useCreateIndex:true, 
        useUnifiedTopology:true,
        useFindAndModify:false 
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
