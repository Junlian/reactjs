import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Schema Definitions
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

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
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'pantry']
  },
  imageUrl: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'l', 'ml', 'piece', 'pack']
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Sample Data
const sampleProducts = [
  {
    name: "Fresh Organic Bananas",
    description: "Sweet and ripe organic bananas",
    price: 2.99,
    category: "fruits",
    imageUrl: "https://images.unsplash.com/photo-1543218024-57a70143c369",
    stock: 100,
    unit: "kg",
    isAvailable: true
  },
  {
    name: "Whole Milk",
    description: "Fresh whole milk from local farms",
    price: 3.49,
    category: "dairy",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    stock: 50,
    unit: "l",
    isAvailable: true
  }
];

// Sample Test Users
const testUsers = [
  {
    email: 'customer@example.com',
    password: 'Customer123!',
    name: 'John Customer',
    role: 'customer',
    addresses: [{
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      isDefault: true
    }]
  },
  {
    email: 'premium@example.com',
    password: 'Premium123!',
    name: 'Sarah Premium',
    role: 'premium',
    addresses: [{
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'ST',
      zipCode: '67890',
      isDefault: true
    }]
  },
  {
    email: 'store@example.com',
    password: 'Store123!',
    name: 'Mike Store',
    role: 'store_owner',
    addresses: [{
      street: '789 Market St',
      city: 'Business',
      state: 'ST',
      zipCode: '11223',
      isDefault: true
    }]
  },
  {
    email: 'admin@example.com',
    password: 'Admin123!',
    name: 'Admin User',
    role: 'admin',
    addresses: [{
      street: '321 Admin St',
      city: 'Control',
      state: 'ST',
      zipCode: '99999',
      isDefault: true
    }]
  }
];

// Database Initialization Function
async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create models
    const User = mongoose.model('User', userSchema);
    const Product = mongoose.model('Product', productSchema);
    const Order = mongoose.model('Order', orderSchema);

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      testUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
          isActive: true,
          createdAt: new Date()
        };
      })
    );

    // Insert test users
    await User.insertMany(hashedUsers);
    console.log('Test users created successfully');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    console.log('\nTest Users Created:');
    console.log('-------------------');
    testUsers.forEach(user => {
      console.log(`
Role: ${user.role}
Email: ${user.email}
Password: ${user.password}
Name: ${user.name}
-------------------`);
    });

    console.log('\nDatabase initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run initialization
initializeDatabase();

// Export models and schemas for use in the application
export const Models = {
  User: mongoose.model('User', userSchema),
  Product: mongoose.model('Product', productSchema),
  Order: mongoose.model('Order', orderSchema)
}; 