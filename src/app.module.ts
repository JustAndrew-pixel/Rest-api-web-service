import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    FriendsModule,
    MongooseModule.forRoot(`mongodb+srv://andrej:andrej@cluster0.t2rh8.mongodb.net/friends?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
