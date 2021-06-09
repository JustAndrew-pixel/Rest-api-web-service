import { IsInt, IsString,  } from 'class-validator';

export class UpdateFriendDto {
 @IsString()
  readonly name: string

  @IsInt()
  readonly age: number

  @IsString()
  readonly city: string

  @IsString()
  readonly phoneNumber: string


}

//DTO - Data Transfer Object