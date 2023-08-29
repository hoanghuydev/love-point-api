const { initializeApp } = require('firebase/app');
const {
    getAnalytics,
    isSupported,
    initializeAnalytics,
} = require('firebase/analytics');

const firebaseConfig = {
    apiKey: 'AIzaSyC12pKhyHAea3x1GhfS-5LHlIOGiotoJrQ',
    authDomain: 'lovepoint-744b7.firebaseapp.com',
    projectId: 'lovepoint-744b7',
    storageBucket: 'lovepoint-744b7.appspot.com',
    messagingSenderId: '618438047417',
    appId: '1:618438047417:web:05533d50b6ac21f2e24d68',
    measurementId: 'G-9RRF30KG5S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = { app };
