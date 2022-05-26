import * as mongoose from 'mongoose';

export const Flightchema = new mongoose.Schema(
  {
    pilot: { type: String, required: true },
    airplane: { type: String, required: true },
    destinationCity: { type: String, required: true },
    flightDate: { type: Date, required: true },
    passengers: [{type: mongoose.Schema.Types.ObjectId, ref:'passengers'}]
  },
  { timestamps: true },
);