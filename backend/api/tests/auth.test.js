const axios = require('axios');

const API_URL = 'http://localhost:8800/api';

const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'password123'
};

const testAgent = {
    name: {
        first: 'John',
        last: 'Doe'
    },
    email: `agent_${Date.now()}@example.com`,
    password: 'password123',
    phone: '+1234567890',
    address: {
        street: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        zipCode: '12345'
    },
    license: {
        number: 'LICENSE123',
        state: 'Test State'
    }
};

async function runTests() {
    try {
        console.log('Starting authentication tests...\n');

        // Test User Registration
        console.log('1. Testing User Registration');
        const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
        console.log('✓ User registration successful');
        console.log('Token received:', registerResponse.data.token);

        // Test User Login
        console.log('\n2. Testing User Login');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✓ User login successful');
        const userToken = loginResponse.data.token;

        // Test Token Verification
        console.log('\n3. Testing Token Verification');
        const verifyResponse = await axios.get(`${API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('✓ Token verification successful');

        // Test Agent Registration
        console.log('\n4. Testing Agent Registration');
        const agentRegisterResponse = await axios.post(`${API_URL}/auth/register-agent`, testAgent);
        console.log('✓ Agent registration successful');

        // Test Agent Login
        console.log('\n5. Testing Agent Login');
        const agentLoginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: testAgent.email,
            password: testAgent.password
        });
        console.log('✓ Agent login successful');

        console.log('\nAll tests completed successfully! ✨');
    } catch (error) {
        console.error('\n❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the tests
runTests();
