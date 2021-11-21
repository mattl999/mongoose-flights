const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: { type: String,
        // enum:['LAX', 'JFK'],
      required: true },
    arrival: {type: Date,
        required:true},
},{
    timestamps: true,
});
const flightSchema = new Schema({
    airline : {
        type: String,
        required: true
    },
    airport : {
        type: String,
        required:true,
    },
    flightNo : {
        type: Number,
        required: true,
    },
    departs : {
        type: Date,
        required: true,
    },
    destinations: [destinationSchema],
    tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}]
},{
    timestamps: true
  });

  module.exports = mongoose.model('Flight', flightSchema);
  