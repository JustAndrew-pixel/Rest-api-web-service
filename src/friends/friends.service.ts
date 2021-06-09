import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Friend, FriendDocument } from './schemas/friend.schema';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PartUpdateFriendDto } from './dto/partUpdate-friend.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class FriendsService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument> ) {
  }
//, page, limit, sort, fields

  async getAll(outputFormat?: string,
               page?: number,
               limit?: number,
               sort?: string,
               fields?: string): Promise<Friend[]> {

    //////Selection
    let selectionFields;
    if (fields != undefined){
      selectionFields = fields.replace(/,/g, " ");
      if (!selectionFields.includes("_id")){
        selectionFields= selectionFields+ ' -_id';
      }
    }
    //////Selection end


    //////Sorting

    let totalSortingField;
    //console.log(sort);
    if (sort != undefined){
      if (sort === ' age'){
        totalSortingField = {age: 'ascending'}
      } else
      if (sort === '-age'){
        totalSortingField = {age: 'descending'}
      } else
      if (sort === ' city'){
        totalSortingField = {city: 'ascending'}
      } else
      if (sort === '-city'){
        totalSortingField = {city: 'descending'}
      } else
      if (sort === ' age, city'){
        totalSortingField = {age: 'ascending', city: 'ascending'}
      } else
      if (sort === ' city, age'){
        totalSortingField = {city: 'ascending', age: 'ascending'}
      } else
      if (sort === '-age,-city'){
        totalSortingField = {age: 'descending', city: 'descending'}
      } else
      if (sort === '-city,-age'){
        totalSortingField = {city: 'descending', age: 'descending'}
      } else
      if (sort === ' age,-city'){
        totalSortingField = {age: 'ascending', city: 'descending'}
      } else
      if (sort === '-age, city'){
        totalSortingField = {city: 'ascending', age: 'descending' }
      } else
      if (sort === ' city,-age'){
        totalSortingField = {city: 'ascending', age: 'descending'}
      } else
      if (sort === '-city, age'){
        totalSortingField = {age: 'ascending', city: 'descending' }
      }

    }
    //////Sorting end


    if(outputFormat==='application/xml'){
      let convert = require('xml-js');
      let response = await this.friendModel.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( totalSortingField )
        .select(selectionFields)
        .exec();

let ANSWER = JSON.stringify(response);
    // console.log('JJSON= ' +ANSWER);
      let options = {compact: true, ignoreComment: true, spaces: 4, trim:true, fullTagEmptyElement:true};
      let result = convert.json2xml(ANSWER, options);
      return result;
    } else
      return this.friendModel.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( totalSortingField )
        .select(selectionFields)
        .exec();
  }



/*  async getById(id: string): Promise<Friend> {
    return this.friendModel.findById(id);

  }*/


  async getByUUID(uuid: string): Promise<any> {
    return this.friendModel.findOne({ uuid: uuid });
  }



    async getAllByQueryParam(outputFormat?: string,
                          name?: string,
                          age?: number,
                          page?: number,
                          limit?:number,
                          sort?:string,
                          fields?:string): Promise<any> {

      //////Selection
      let selectionFields;
      if (fields != undefined){
        selectionFields = fields.replace(/,/g, " ");
        if (!selectionFields.includes("_id")){
          selectionFields= selectionFields+ ' -_id';
        }
      }
      //////Selection end


      //////Sorting

      let totalSortingField;
      //console.log(sort);
      if (sort != undefined){
        if (sort === ' age'){
          totalSortingField = {age: 'ascending'}
        } else
        if (sort === '-age'){
          totalSortingField = {age: 'descending'}
        } else
        if (sort === ' city'){
          totalSortingField = {city: 'ascending'}
        } else
        if (sort === '-city'){
          totalSortingField = {city: 'descending'}
        } else
        if (sort === ' age, city'){
          totalSortingField = {age: 'ascending', city: 'ascending'}
        } else
        if (sort === ' city, age'){
          totalSortingField = {city: 'ascending', age: 'ascending'}
        } else
        if (sort === '-age,-city'){
          totalSortingField = {age: 'descending', city: 'descending'}
        } else
        if (sort === '-city,-age'){
          totalSortingField = {city: 'descending', age: 'descending'}
        } else
        if (sort === ' age,-city'){
          totalSortingField = {age: 'ascending', city: 'descending'}
        } else
        if (sort === '-age, city'){
          totalSortingField = {age: 'descending', city: 'ascending'}
        } else
        if (sort === ' city,-age'){
          totalSortingField = {city: 'ascending', age: 'descending'}
        } else
        if (sort === '-city, age'){
          totalSortingField = {city: 'descending', age: 'ascending'}
        }

      }
      //////Sorting end


if (age === undefined){

  if(outputFormat==='application/xml'){
    let convert = require('xml-js');
    let response = await this.friendModel.find({ name: name })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort( totalSortingField )
      .select(selectionFields)
      .exec();

    let ANSWER = JSON.stringify(response);
    // console.log('JJSON= ' +ANSWER);
    let options = {compact: true, ignoreComment: true, spaces: 4, trim:true, fullTagEmptyElement:true};
    let result = convert.json2xml(ANSWER, options);
    return result;
  } else
    //{age: 'ascending', phoneNumber: 'ascending'}
    return this.friendModel.find({ name: name })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort( totalSortingField )
      .select(selectionFields)
      .exec();


} else
  if (name === undefined){

    if(outputFormat==='application/xml'){
      let convert = require('xml-js');
      let response = await this.friendModel.find({ age:age })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( totalSortingField )
        .select(selectionFields)
        .exec();

      let ANSWER = JSON.stringify(response);
      // console.log('JJSON= ' +ANSWER);
      let options = {compact: true, ignoreComment: true, spaces: 4, trim:true, fullTagEmptyElement:true};
      let result = convert.json2xml(ANSWER, options);
      return result;
    } else
      //{age: 'ascending', phoneNumber: 'ascending'}
      return this.friendModel.find({ age:age })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( totalSortingField )
        .select(selectionFields)
        .exec();

  }
  else {

    if(outputFormat==='application/xml'){
      let convert = require('xml-js');
      let response = await this.friendModel.find({ name: name, age: age })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( totalSortingField )
        .select(selectionFields)
        .exec();

      let ANSWER = JSON.stringify(response);
      // console.log('JJSON= ' +ANSWER);
      let options = {compact: true, ignoreComment: true, spaces: 4, trim:true, fullTagEmptyElement:true};
      let result = convert.json2xml(ANSWER, options);
      return result;
    } else
      //{age: 'ascending', phoneNumber: 'ascending'}
      return this.friendModel.find({ name: name, age: age })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( totalSortingField )
        .select(selectionFields)
        .exec();


  }
//console.log(query.getFilter())
// Subsequent chained calls merge new properties into the filter
   // query.find({ age: { $gt: 50 } });
   // query.getFilter(); // `{ name: 'Jean-Luc Pi

  }

  async create(friendDto: CreateFriendDto): Promise<Friend> {
  const  newFriend = new this.friendModel(friendDto);
  newFriend.uuid = uuidv4();
  return newFriend.save()
  }

  async update(uuid: string, friendDto: UpdateFriendDto): Promise<Friend>{

    return this.friendModel.findOneAndUpdate({uuid:uuid}, friendDto, {new: true})

  }

   async partUpdate(uuid: string, friendDto: PartUpdateFriendDto): Promise<Friend>{
    //console.log(friendDto)

     return this.friendModel.findOneAndUpdate({uuid:uuid},{ $set: friendDto} , {new: true})
   }

/*  async remove(id: string): Promise<Friend> {
    return this.friendModel.findByIdAndRemove(id)
  }*/
  async remove(uuid: string): Promise<Friend> {
   return this.friendModel.findOneAndRemove({uuid:uuid})

  }

}