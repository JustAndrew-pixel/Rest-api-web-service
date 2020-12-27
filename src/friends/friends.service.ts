import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Friend, FriendDocument } from './schemas/friend.schema';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PartUpdateFriendDto } from './dto/partUpdate-friend.dto';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument> ) {
  }


  async getAll(): Promise<Friend[]> {
    return this.friendModel.find().exec();
  }

  async getById(id: string): Promise<Friend> {
    return this.friendModel.findById(id)
  }


  async create(friendDto: CreateFriendDto): Promise<Friend> {
  const  newFriend = new this.friendModel(friendDto);
  return newFriend.save()
  }

  async remove(id: string): Promise<Friend> {
    return this.friendModel.findByIdAndRemove(id)
  }

  async update(id: string, friendDto: UpdateFriendDto): Promise<Friend>{
    return this.friendModel.findByIdAndUpdate(id, friendDto, {new: true})
  }

 /* async partUpdate(id: string, friendDto: PartUpdateFriendDto): Promise<Friend>{
   console.log(friendDto)

    return this.friendModel.findByIdAndUpdate(id, { $set: friendDto}, {new: true})
  }*/

}