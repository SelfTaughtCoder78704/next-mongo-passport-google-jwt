import mongoose from 'mongoose';
import Component from './Component';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  tokens: [String],
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    default: []
  }],
});


let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}


export default User;