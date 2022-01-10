const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email!'],
    unique: true,
    lowercase: true,

    validate: {
      validator: function (email) {
        return /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(
          email
        );
      },
      message: 'Invalid email {{VALUE}}',
    },
  },
  password: {
    type: String,
    required: [true, 'Provide a password'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Provide a password'],
    validate: {
      validator: function (password) {
        return password === this.password;
      },
      message: 'Passwords are not equal.',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
