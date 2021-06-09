import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type FriendDocument = Friend & Document

@Schema()
export class Friend {

  @Prop()
  name: string

  @Prop()
  age: number

  @Prop()
  city: string

  @Prop()
  phoneNumber: string

  @Prop()
  uuid: string

}

export const FriendSchema = SchemaFactory.createForClass(Friend)

