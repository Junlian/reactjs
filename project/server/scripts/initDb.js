import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Import models
import User from '../models/User.js';
import Product from '../models/Product.js';
import Store from '../models/Store.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// Sample Users Data
const sampleUsers = [
  {
    email: 'customer@example.com',
    password: 'Customer123!',
    name: 'John Customer',
    role: 'customer',
    addresses: [{
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
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
      state: 'CA',
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
      state: 'CA',
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
      state: 'CA',
      zipCode: '99999',
      isDefault: true
    }]
  }
];

// Sample Stores Data
const sampleStores = [
  {
    name: 'Fresh Market',
    address: {
      street: '100 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105'
    },
    rating: 4.8,
    deliveryTime: '20-35 min',
    isActive: true
  },
  {
    name: 'Organic Paradise',
    address: {
      street: '200 Green Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110'
    },
    rating: 4.6,
    deliveryTime: '25-40 min',
    isActive: true
  },
  {
    name: 'Local Farmers Market',
    address: {
      street: '300 Farm Road',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94115'
    },
    rating: 4.9,
    deliveryTime: '15-30 min',
    isActive: true
  }
];

// Sample Products Data
const sampleProducts = [
  // Fruits
  {
    name: 'Organic Bananas',
    description: 'Sweet and ripe organic bananas, perfect for smoothies and snacks',
    price: 2.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    stock: 100,
    isAvailable: true
  },
  {
    name: 'Fresh Strawberries',
    description: 'Juicy, ripe strawberries picked at peak freshness',
    price: 4.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1518635017480-d9d458143a41',
    stock: 80,
    isAvailable: true
  },
  // Vegetables
  {
    name: 'Organic Avocados',
    description: 'Perfectly ripe Hass avocados',
    price: 2.49,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
    stock: 75,
    isAvailable: true
  },
  {
    name: 'Baby Spinach',
    description: 'Fresh organic baby spinach leaves',
    price: 3.49,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    stock: 60,
    isAvailable: true
  },
  // Dairy
  {
    name: 'Organic Whole Milk',
    description: 'Fresh whole milk from local grass-fed cows',
    price: 3.99,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt, plain',
    price: 4.49,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    stock: 40,
    isAvailable: true
  },
  // Bakery
  {
    name: 'Sourdough Bread',
    description: 'Freshly baked artisanal sourdough bread',
    price: 5.99,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    stock: 30,
    isAvailable: true
  },
  {
    name: 'Chocolate Croissants',
    description: 'Flaky, buttery croissants with rich chocolate filling',
    price: 3.99,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb',
    stock: 45,
    isAvailable: true
  }
];

// Database Initialization Function
async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Store.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});

    // Create users with hashed passwords
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
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

    const createdUsers = await User.insertMany(hashedUsers);
    console.log('Sample users created successfully');

    // Create stores with owner references
    const storeOwner = createdUsers.find(user => user.role === 'store_owner');
    const storesWithOwners = sampleStores.map(store => ({
      ...store,
      owner: storeOwner._id,
      createdAt: new Date()
    }));

    const createdStores = await Store.insertMany(storesWithOwners);
    console.log('Sample stores created successfully');

    // Create products with store references and timestamps
    const productsWithStores = sampleProducts.map((product, index) => ({
      ...product,
      store: createdStores[index % createdStores.length]._id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const createdProducts = await Product.insertMany(productsWithStores);
    console.log('Sample products created successfully');

    // Create carts for customers
    const customer = createdUsers.find(user => user.role === 'customer');
    const cartItems = [
      {
        product: createdProducts[0]._id,
        quantity: 2
      },
      {
        product: createdProducts[1]._id,
        quantity: 1
      }
    ];

    await Cart.create({
      user: customer._id,
      items: cartItems,
      lastUpdated: new Date()
    });
    console.log('Sample cart created successfully');

    // Create sample orders
    const sampleOrders = [
      {
        status: 'delivered',
        deliveryFee: 5.00,
        paymentMethod: {
          type: 'credit_card',
          details: { last4: '4242' }
        }
      },
      {
        status: 'pending',
        deliveryFee: 5.00,
        paymentMethod: {
          type: 'paypal',
          details: { email: 'customer@example.com' }
        }
      }
    ];

    const orderPromises = sampleOrders.map(order => {
      const randomProducts = createdProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      const items = randomProducts.map(product => ({
        product: product._id,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: product.price
      }));

      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return Order.create({
        user: customer._id,
        store: createdStores[0]._id,
        items,
        total,
        deliveryAddress: customer.addresses[0],
        ...order,
        createdAt: new Date()
      });
    });

    await Promise.all(orderPromises);
    console.log('Sample orders created successfully');

    console.log('\nTest Users Created:');
    console.log('-------------------');
    sampleUsers.forEach(user => {
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