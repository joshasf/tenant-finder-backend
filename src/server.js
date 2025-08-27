const express = require('express');
const cors = require('cors');
const { Client } = require('@googlemaps/google-maps-services-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Google Maps client
const googleMapsClient = new Client({});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'TenantFinder Backend is running' });
});

// Search tenants endpoint
app.post('/api/search-tenants', async (req, res) => {
  try {
    const { address, options = {} } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    console.log('Searching for tenants at:', address);

    // For now, return mock data
    // TODO: Implement actual Google Places API integration
    const mockTenants = [
      {
        companyName: 'TechStart Solutions',
        businessType: 'Technology',
        industry: 'Software Development',
        floor: '12',
        suite: '1201',
        phone: '(555) 123-4567',
        email: 'info@techstart.com',
        website: 'techstart.com'
      },
      {
        companyName: 'Green Valley Marketing',
        businessType: 'Marketing Agency',
        industry: 'Digital Marketing',
        floor: '8',
        suite: '805',
        phone: '(555) 987-6543',
        email: 'hello@greenvalley.com',
        website: 'greenvalleymarketing.com'
      },
      {
        companyName: 'Metropolitan Law Group',
        businessType: 'Legal Services',
        industry: 'Law',
        floor: '15',
        suite: '1500-1502',
        phone: '(555) 456-7890',
        email: 'contact@metrolaw.com',
        website: 'metropolitanlawgroup.com'
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json(mockTenants);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`TenantFinder Backend running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});
