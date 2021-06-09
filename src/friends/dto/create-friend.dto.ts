import { IsInt, IsString } from 'class-validator';


export class CreateFriendDto {
  @IsString()
  readonly name: string

  @IsInt()
  readonly age: number

  @IsString()
  readonly city: string

  @IsString()
  readonly phoneNumber: string

 /* @IsString()
  readonly uuid: string*/
}

//DTO - Data Transfer Object