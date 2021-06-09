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
  Header, Patch, HttpException, UseFilters, UsePipes, Query,  Headers, InternalServerErrorException,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PartUpdateFriendDto } from './dto/partUpdate-friend.dto';
import { FriendsService } from './friends.service';
import { Friend } from './schemas/friend.schema';
import { GetByUUIDHttpExceptionFilter } from '../filters/getByUUIDHttp-exception.filter';
import { GetAllHttpExceptionFilter } from '../filters/getAllHttp-exception.filter';
import { DeleteHttpExceptionFilter } from '../filters/deleteHttp-exception.filter';
import { PostValidationPipe } from '../pipes/postValidation.pipe';
import { PutValidationPipe } from '../pipes/putValidatePipe.pipe';
import { PatchHttpExceptionFilter } from '../filters/patchHttp-exception.filter';



@Controller('friends')

export class FriendsController {

  constructor(private readonly friendsService: FriendsService) {
  }

  /* @Get()
   getAll(@Req() req: Request, @Res() res: Response): string {
     res.status(201).end('goodbye')
     return 'getAll';
   }*/



 /* @Get()
  @UseFilters(GetAllHttpExceptionFilter)
  getAll(): Promise<Friend[]> {

      return this.friendsService.getAll()
        .catch(() =>{
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        })
        .then((result) => {
          if (result?.length === 0) {
            throw new HttpException('Friends list is empty', HttpStatus.NOT_FOUND);
          } else return result
        })

  }*/

//
  @Get()
  @UseFilters(GetAllHttpExceptionFilter)
  getAllByQueryParam(@Headers('Accept') contentType: string,
                  @Query('name') name: string,
                  @Query('age') age: number,
                  @Query('page') page: number,
                  @Query('limit') limit: number,
                  @Query('sort') sort: string,
                  @Query('fields') fields: string): Promise<Friend[]> {


    if (name || age){
      //console.log(age);

      return this.friendsService.getAllByQueryParam(contentType, name, age, page, limit, sort, fields)
    } else
// throw new InternalServerErrorException()
    return this.friendsService.getAll(contentType, page, limit, sort, fields)
      .catch(() =>{
        throw new HttpException('A problem has appeared on the Server side', HttpStatus.INTERNAL_SERVER_ERROR);
      })
      .then((result) => {
        if (result?.length === 0) {
          throw new HttpException('Friends list is empty', HttpStatus.NOT_FOUND);
        } else return result
      })

  }



// @Query('page') page: number = 1,
  // @Query('limit') limit: number = 10
 // @Req() req: Request




/*  @Get(':id/filter')
  showFriendById(@Query('id') id: string,
                 @Query('name') name: string) {

    console.log(id);
    console.log(name);
    return this.friendsService.getById(id)
  }*/



  
 /* @Get(':id')
  @UseFilters(GetByUUIDHttpExceptionFilter)
  getOne(@Param('id') id: string): Promise<Friend> {
  //console.log(id)
    return this.friendsService.getById(id)
      .catch((e) =>{
        //console.log(e)
        throw new HttpException(`The friend with id=${id} hasn\'t been found`, HttpStatus.NOT_FOUND);

      })
      .then((result) => {
        return result;
      /!*  if (result) {

        } else {
          throw new HttpException(`The friend with id=${id} hasn\'t been found`, HttpStatus.NOT_FOUND);
        }*!/
      })

  }*/

  @Get(':uuid')
  @UseFilters(GetByUUIDHttpExceptionFilter)
  getOne(@Param('uuid') uuid: string): Promise<Friend> {
    //console.log(id)
    // throw new InternalServerErrorException()
    return this.friendsService.getByUUID(uuid)
      .catch(() =>{

        throw new HttpException(`A problem has appeared on the Server side`, HttpStatus.INTERNAL_SERVER_ERROR);

      })
      .then((result) => {
        if (result === null) {
          throw new HttpException(`The friend with uuid=${uuid} hasn\'t been found`, HttpStatus.NOT_FOUND);
        } else return result
      })

  }


  @Post()
  @UsePipes(PostValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createFriendDto: CreateFriendDto): Promise<Friend> {
   // throw new InternalServerErrorException()
    return this.friendsService.create(createFriendDto)
      .catch(() =>{
        throw new HttpException('A problem has appeared on the Server side', HttpStatus.INTERNAL_SERVER_ERROR);
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(`Bad Request`, HttpStatus.BAD_REQUEST);
        }
      })


  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':uuid')
  @UsePipes(PutValidationPipe)
  update( @Param('uuid') uuid: string,
          @Body() updateFriendDto: UpdateFriendDto): Promise<Friend> {
   //  throw new InternalServerErrorException()
    return this.friendsService.update(uuid, updateFriendDto)
      .catch(() =>{
        throw new HttpException('A problem has appeared on the Server side', HttpStatus.INTERNAL_SERVER_ERROR);
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(`Bad Request`, HttpStatus.BAD_REQUEST);
        }
      })

  }

 /* @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  partUpdate(@Body() partUpdateFriendDto: PartUpdateFriendDto, @Param('id') id: string): Promise<Friend>{
  console.log(partUpdateFriendDto)
  console.log(id)
    return this.friendsService.partUpdate(id, partUpdateFriendDto)
  }*/

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(PatchHttpExceptionFilter)
  @Patch(':uuid')
  partUpdate(@Body() partUpdateFriendDto: PartUpdateFriendDto, @Param('uuid') uuid: string): Promise<Friend>{
    //console.log(partUpdateFriendDto)
   // console.log(uuid)
    throw new InternalServerErrorException()
    return this.friendsService.partUpdate(uuid, partUpdateFriendDto)
      .catch(() =>{
        throw new HttpException(`A problem has appeared on the Server side`, HttpStatus.INTERNAL_SERVER_ERROR);
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(`The friend with uuid=${uuid} hasn\'t been found and can\'t be updated`, HttpStatus.NOT_FOUND);
        }
      })


  }



  @Delete(':uuid')
  @UseFilters(DeleteHttpExceptionFilter)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string): Promise<Friend> {
    // throw new InternalServerErrorException()
    return this.friendsService.remove(uuid)
      .catch(() =>{
        throw new HttpException('A problem has appeared on the Server side', HttpStatus.INTERNAL_SERVER_ERROR);
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(`The friend with uuid=${uuid} hasn\'t been found and can\'t be deleted`, HttpStatus.NOT_FOUND);
        }
      })

  }


}
