import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Flights')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService, 
    private readonly passengerService:PassengerService) {}

  @Post()
  create(@Body() flightDTO: FlightDTO){
    return this.flightService.create(flightDTO);
  }

  @Get()
  getAll(){
    return this.flightService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string){
    return this.flightService.getOne(id)
  }

  @Put(":id")
  update(@Param("id") id:string, @Body() flightDTO: FlightDTO){
    return this.flightService.update(id,flightDTO)
  }

  @Delete(":id")
  delete(@Param("id") id: string){
    return this.flightService.delete(id)
  }

  @Post(":flightId/passenger/:passengerId")
  async addPassenger(
    @Param('flightId') flightId:string, 
  @Param("passengerId") passengerId:string){
    const passenger = await this.passengerService.getOne(passengerId)
    if(!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND)
    return this.flightService.addPassenger(flightId, passengerId)
  }
}
