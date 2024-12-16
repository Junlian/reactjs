export const dummyData = {
  products: [
    {
      name: "Fresh Organic Bananas",
      description: "Sweet and ripe organic bananas, perfect for smoothies and snacks",
      price: 2.99,
      category: "fruits",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Organic Whole Milk",
      description: "Fresh whole milk from local grass-fed cows",
      price: 3.99,
      category: "dairy",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      stock: 50,
      isAvailable: true
    },
    {
      name: "Artisan Sourdough Bread",
      description: "Freshly baked artisanal sourdough bread",
      price: 5.99,
      category: "bakery",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      stock: 30,
      isAvailable: true
    },
    {
      name: "Organic Avocados",
      description: "Perfectly ripe Hass avocados",
      price: 2.49,
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578",
      stock: 75,
      isAvailable: true
    },
    {
      name: "Free Range Eggs",
      description: "Farm fresh free-range eggs, dozen",
      price: 4.99,
      category: "dairy",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
      stock: 100,
      isAvailable: true
    },
    {
      name: "Organic Baby Spinach",
      description: "Fresh organic baby spinach leaves",
      price: 3.49,
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
      stock: 60,
      isAvailable: true
    },
    {
      name: "Greek Yogurt",
      description: "Creamy Greek yogurt, plain",
      price: 4.49,
      category: "dairy",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
      stock: 40,
      isAvailable: true
    },
    {
      name: "Organic Strawberries",
      description: "Sweet and juicy organic strawberries",
      price: 4.99,
      category: "fruits",
      image: "https://images.unsplash.com/photo-1518635017480-d9d458143a41",
      stock: 80,
      isAvailable: true
    }
  ],
  
  stores: [
    {
      name: "Fresh Market",
      address: {
        street: "123 Market Street",
        city: "Foodville",
        state: "CA",
        zipCode: "90210"
      },
      rating: 4.8,
      deliveryTime: "20-35 min",
      isActive: true
    },
    {
      name: "Organic Paradise",
      address: {
        street: "456 Green Avenue",
        city: "Ecotown",
        state: "CA",
        zipCode: "90211"
      },
      rating: 4.6,
      deliveryTime: "25-40 min",
      isActive: true
    }
  ],
  
  carts: [
    {
      items: [
        {
          quantity: 2,
          // Product ID will be set during initialization
        },
        {
          quantity: 1,
          // Product ID will be set during initialization
        }
      ]
    }
  ],
  
  orders: [
    {
      status: "pending",
      deliveryFee: 5.00,
      paymentMethod: {
        type: "credit_card",
        details: {
          last4: "4242"
        }
      }
    },
    {
      status: "delivered",
      deliveryFee: 5.00,
      paymentMethod: {
        type: "paypal",
        details: {
          email: "customer@example.com"
        }
      }
    }
  ]
}; 