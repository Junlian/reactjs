import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.startsWith('http') || value.startsWith('https');
      },
      message: 'Image URL must be a valid URL'
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'pantry']
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema); 