import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';


//creating an interface for the argument that will be passed to the serilizer class

interface ClassConstructor{
  new(...args: any[]): {};  //any[] is used because we can pass multiple arguments in a single array.
}

//creating our own decorator
export function Serialize(dto:ClassConstructor){
  return UseInterceptors(new SerializerInterceptor(dto))
}
export class SerializerInterceptor implements NestInterceptor{
  constructor(private dto: any){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any)=>{
        return plainToClass(this.dto,data,{
           excludeExtraneousValues:true,
        })
      })
    );
  }
}
 