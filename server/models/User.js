const mongoose = require('mongoose');
const	bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    account: {
      type: String,
      default: '',
  		trim: true
    },
    description: {
  		type: String,
  		default: '',
  		trim: true
    },
    profile_img_url: {
  		type: String,
  		default: '',
  		trim: true
    },
    active: {
      type: Boolean,
      default: false
    },
    created: {
  		type: Date,
  		default: Date.now
  	},
    updated: {
    	type: Date,
  		default: Date.now
    },
    local: {
      email: {
        type: String,
        unique: true,
        trim:true,
        required: [true, 'Email cannot be blank'],
        validate: {
          validator: v => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
          message: props => `${props.value} is not a valid email!`
        }
      },
      password: {
        type: String,
        default: '',
        required: [true, 'Password cannot be blank'],
        validate: {
          validator: v => v && v.length > 6,
          message: props => `${props.value} is not a valid email!`
        }
      },
      name: {
        type: String,
        trim:true,
        required: [true, 'Name cannot be blank'],
      }
    },
    facebook: {
      id           : String,
      token        : String,
      name         : String,
      email        : String
    },
    twitter: {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
    },
    google: {
      id           : String,
      token        : String,
      email        : String,
      name         : String
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  const user = this;
	if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.local.password, salt, function(err, hash) {
            if (err) return next(err);
            user.local.password = hash;
            next();
        });
    });
	} else {
    next();
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.local.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

/*
  crypto.pbkdf2
 //Hook a pre save method to hash the password
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

 // Create instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};


/**
 * Create instance method for authenticating user

UserSchema.methods.authenticate = function(password) {
	return bcrypt.compareSync(password, this.password);
};
*/

module.exports = mongoose.model('User', UserSchema);
