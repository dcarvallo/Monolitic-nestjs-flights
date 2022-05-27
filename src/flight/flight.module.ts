import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight } from 'src/common/models/models';
import { PassengerModule } from 'src/passenger/passenger.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flightchema } from './schema/flight.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Flight.name,
    useFactory: () => Flightchema.plugin(require('mongoose-autopopulate'))
  }]),
    PassengerModule,
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
