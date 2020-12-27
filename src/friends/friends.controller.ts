import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  Header, Patch, HttpException,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PartUpdateFriendDto } from './dto/partUpdate-friend.dto';
import { FriendsService } from './friends.service';
import { Friend } from './schemas/friend.schema';
import { ValidationPipe } from '@nestjs/common';


@Controller('friends')
export class FriendsController {

  constructor(private readonly friendsService: FriendsService) {
  }

  /* @Get()
   getAll(@Req() req: Request, @Res() res: Response): string {
     res.status(201).end('goodbye')
     return 'getAll';
   }*/

  @Get()
  getAll(): Promise<Friend[]> {
    return this.friendsService.getAll();
  }

  
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Friend> {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: `The friend with id= ${id} hasn\'t been found`,
    }, HttpStatus.NOT_FOUND);

    return this.friendsService.getById(id);

  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createFriendDto: CreateFriendDto): Promise<Friend> {
    return this.friendsService.create(createFriendDto);
  }

  @Put(':id')
  update(@Body() updateFriendDto: UpdateFriendDto, @Param('id') id: string): Promise<Friend> {
    return this.friendsService.update(id, updateFriendDto);
  }

 /* @Patch(':id')
  partUpdate(@Body(new ValidationPipe({transform: true})) partUpdateFriendDto: PartUpdateFriendDto, @Param('id') id: string): Promise<Friend>{
  console.log(partUpdateFriendDto)
console.log(id)
    return this.friendsService.partUpdate(id, partUpdateFriendDto)
  }*/

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<Friend> {
    return this.friendsService.remove(id);
  }


}
