const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BackSchema = new Schema({
    user: {
      		  type: Schema.ObjectId,
      		  ref: 'User'
  	},
    project: {
      		  type: Schema.ObjectId,
      		  ref: 'Project'
  	},
    amount: {
        		type: Decimal128,
            required: 'Amount cannot be blank'
  	},
    gift: {
            type: Schema.ObjectId,
            ref: 'Gift'
    },
    created: {
        		type: Date,
        		default: Date.now
  	},
    updated: {
          	type: Date,
    }
});

module.exports = mongoose.model('Back', BackSchema);
