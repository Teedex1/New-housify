const axios = require('axios');

const API_URL = 'http://localhost:8800/api';

const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'password123'
};

let accessToken;
let refreshToken;

async function runTests() {
    try {
        console.log('Starting extended authentication tests...\n');

        // Register user first
        console.log('1. Setting up test user');
        const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
        accessToken = registerResponse.data.accessToken;
        console.log('✓ Test user created');

        // Test Password Reset Flow
        console.log('\n2. Testing Password Reset Flow');
        
        // Request password reset
        console.log('  2.1. Requesting password reset');
        const forgotResponse = await axios.post(`${API_URL}/auth/forgot-password`, {
            email: testUser.email
        });
        console.log('  ✓ Password reset email sent');

        if (forgotResponse.data.message !== "Password reset email sent") {
            throw new Error("Password reset email not sent");
        }

        // Test Email Verification Flow
        console.log('\n3. Testing Email Verification Flow');
        
        // Request verification email
        console.log('  3.1. Requesting verification email');
        const verifyEmailResponse = await axios.post(
            `${API_URL}/auth/send-verification-email`,
            {},
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        );
        console.log('  ✓ Verification email sent');

        if (verifyEmailResponse.data.message !== "Verification email sent") {
            throw new Error("Verification email not sent");
        }

        // Test Refresh Token Flow
        console.log('\n4. Testing Refresh Token Flow');
        
        // Login to get refresh token
        console.log('  4.1. Getting refresh token');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        accessToken = loginResponse.data.accessToken;
        refreshToken = loginResponse.data.refreshToken;
        console.log('  ✓ Received access and refresh tokens');
        
        // Request new access token
        console.log('  4.2. Requesting new access token');
        const refreshResponse = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken: refreshToken
        });
        const newAccessToken = refreshResponse.data.accessToken;
        console.log('  ✓ New access token received');

        // Verify new token works
        console.log('  4.3. Verifying new token');
        const verifyResponse = await axios.get(
            `${API_URL}/auth/verify`,
            {
                headers: { Authorization: `Bearer ${newAccessToken}` }
            }
        );
        console.log('  ✓ New token verified successfully');

        console.log('\nAll extended authentication tests completed successfully! ✨');
    } catch (error) {
        console.error('\n❌ Test failed:', error.response?.data || error.message);
        process.exit(1);
    }
}

// Run the tests
runTests();
