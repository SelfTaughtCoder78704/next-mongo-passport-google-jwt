import mongoose from 'mongoose';
import User from './User';
const ComponentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  files: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

let Component;

try {
  Component = mongoose.model('Component');
} catch (e) {
  Component = mongoose.model('Component', ComponentSchema);
}


export default Component;