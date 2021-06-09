import { IsInt, IsOptional, IsString } from 'class-validator';

export class PartUpdateFriendDto {
   @IsString()
   @IsOptional()
   readonly name: string

   @IsInt()
   @IsOptional()
   readonly age: number

   @IsString()
   @IsOptional()
   readonly city: string

   @IsString()
   @IsOptional()
   readonly phoneNumber: string

}
