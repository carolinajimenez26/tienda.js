var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  seller: { // el que lo vendió
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  buyer: { // el que lo compró
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  total: {
    type: Number,
    require: true
  },
  sell: {
    [ {
        { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        amount: Number
    } ]
  }
}, {
  timestamp: true
});

module.exports = mongoose.model('Ticket', TicketSchema);
