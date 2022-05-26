import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passenger')
export class PassengerController {

  constructor(private readonly passengerService: PassengerService) {}
  
  @Post()
  create(@Body() passengerDTO: PassengerDTO){
    return this.passengerService.create(passengerDTO)
  }

  @Get()
  getAll(){
    return this.passengerService.getAll();
  }

  @Get(":id")
  getOne(@Param('id') id:string){
    return this.passengerService.getOne(id)
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() passengerDTO: PassengerDTO){
    return this.passengerService.update(id,passengerDTO)
  }

  @Delete(':id')
  delete(@Param('id') id:string){
    return this.passengerService.delete(id)
  }
}
