const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user:{
            type: Schema.ObjectId,
            ref: 'User'
    },
    message: {
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

module.exports = mongoose.model('Comment', CommentSchema);
