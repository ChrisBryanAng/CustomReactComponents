import mongoose from 'mongoose';

const customComponentSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  styles: {
    type: Object,
    required: true,
  },
});

const CustomComponent = mongoose.model('CustomComponent', customComponentSchema);

export default CustomComponent;
