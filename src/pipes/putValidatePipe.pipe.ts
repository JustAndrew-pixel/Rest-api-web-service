import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';




@Injectable()
export class PutValidationPipe implements PipeTransform<any> {

  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }



    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {


      let errorMessage = '';
      //console.log(value);
      let myJSON = JSON.stringify(value);
      let data = JSON.parse(myJSON);
      //console.log(data)

      if(typeof data.name === 'undefined') {
        let field = 'name ';
        errorMessage = errorMessage + field ;
      }
      if(typeof data.age === 'undefined') {
        let field = 'age ';
        errorMessage = errorMessage + field ;
      }
      if(typeof data.city === 'undefined') {
        let field = 'city ';
        errorMessage = errorMessage + field ;
      }
      if(typeof data.phoneNumber === 'undefined') {
        let field = 'phoneNumber ';
        errorMessage = errorMessage + field ;
      }


      throw new BadRequestException( {
        statusCode: HttpStatus.BAD_REQUEST,
        error: `Bad Request`,
        type: "https://httpstatuses.com/400",
        method: "PUT",
        timestamp: new Date().toLocaleString(),
        description: `The PUT-request is missing the field(s): ${errorMessage}`,
        error_code: 3400,
        information: "https://documentation/internalErrors/3400"
//Pipes (by design) doesn't contain any request (transfer layer) specific details.

      });

    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}