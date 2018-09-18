const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    user:{
      		  type: Schema.ObjectId,
      		  ref: 'User'
  	},
    status: {
            type: String,
            enum : ['ACTIVE', 'CANCELLED', 'INACTIVE', 'WORKING'],
            default: 'INACTIVE'
    },
    ipfs_hash: {
        		type: String,
        		default: '',
        		trim: true,
            required: 'Ipfs Hash cannot be blank'
  	},
    title: {
            type: String,
            default: '',
            trim: true,
            required: 'Title cannot be blank'
    },
    title_short: {
            type: String,
            default: '',
            trim: true,
            required: 'Short Title cannot be blank'
    },
    image_url: {
            type: String,
            default: '',
            trim: true,
            required: 'Image URL cannot be blank'
    },
    video_url: {
            type: String,
            default: '',
            trim: true
    },
    summary: {
            type: String,
            default: '',
            trim: true,
            required: 'Summary cannot be blank'
    },
    category: {
            type: String,
            default: '',
            trim: true,
            required: 'Category cannot be blank'
    },
    policy: {
            type: String,
            default: '',
            trim: true
    },
    story: {
            type: String,
            default: '',
            trim: true
    },
    comments: [{
            type: Schema.ObjectId,
            ref: 'Comment'
    }],
    gifts: [{
            type: Schema.ObjectId,
            ref: 'Gift'
    }]
    due: {
        		type: Date,
            required: 'Due Date cannot be blank.'
  	},
    created: {
        		type: Date,
        		default: Date.now
  	},
    updated: {
          	type: Date,
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
