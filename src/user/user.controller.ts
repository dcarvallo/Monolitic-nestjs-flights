import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({summary: 'Create user'})
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }


  @Get(':id')
  getOne(@Param('id') id: string){
    return this.userService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() userDTO:UserDTO){
    return this.userService.update(id,userDTO)
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.userService.delete(id)
  }
}
