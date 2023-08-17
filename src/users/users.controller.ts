import { Body, Controller,
         Post, Get, 
         Patch, Query, 
         Param, Delete, 
         NotFoundException,
         UseInterceptors,
        ClassSerializerInterceptor
         } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('/auth')
export class UsersController {
    constructor(private userService: UsersService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        this.userService.create(body.email, body.password)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException(`The User with ID ${id} not found`);
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id : string,@Body() userUpdateData: Partial<UpdateUserDto> ){
        return this.userService.Update(parseInt(id), userUpdateData)
    }
}
