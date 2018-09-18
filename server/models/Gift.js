const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    project: {
      		  type: Schema.ObjectId,
      		  ref: 'Project'
  	},
    amount: {
        		type: Decimal128,
            required: 'Amount cannot be blank'
  	},
    limited: {
            type: Boolean
    },
    limited_num: {
            type: Number
    },
    ship: {
            type: Boolean
    },
    ship_date: {
          	type: Date
    },
    items: [{
            type: Schema.ObjectId,
            ref: 'Item'
    }],
    created: {
        		type: Date,
        		default: Date.now
  	},
    updated: {
          	type: Date,
    }
});

module.exports = mongoose.model('Gift', GiftSchema);
