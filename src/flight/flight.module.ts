import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight } from 'src/common/models/models';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flightchema } from './schema/flight.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Flight.name,
    useFactory: () => Flightchema.plugin(require('mongoose-autopopulate'))
  }])],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
