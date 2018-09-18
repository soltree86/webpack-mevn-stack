const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    project: {
      		  type: Schema.ObjectId,
      		  ref: 'Project'
  	},
    description: {
            type: String,
            default: '',
            trim: true
    },
    created: {
        		type: Date,
        		default: Date.now
  	},
    updated: {
          	type: Date,
    }
});

module.exports = mongoose.model('Gift', GiftSchema);
