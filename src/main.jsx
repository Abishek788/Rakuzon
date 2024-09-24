// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import Navbar from './components/Navbar';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import ShopContextProvider from './context/shopcontext.jsx';
// import Footer from './components/Footer';
// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// // Configure Amplify with AWS settings
// Amplify.configure(awsExports);


// function MainApp() {
//   return (
//     <Authenticator>
//       {({ signOut }) => (
//         <>
//         <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> <Navbar signOut={signOut} /></div>
         
//           <App  />
         
//           <Footer />
//         </>
//       )}
//     </Authenticator>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <ShopContextProvider>
//       <MainApp />
//     </ShopContextProvider>
//   </BrowserRouter>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/shopcontext.jsx';
import Footer from './components/Footer';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify with AWS settings
Amplify.configure(awsExports);

// Custom theme for black and white styling
const myTheme = {
  name: 'nike-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#ffffff' }, // Black background
        secondary: { value: '#000000' }, // White background
      },
      font: {
        interactive: { value: '#000000' }, // White text for interactive elements
      },
      brand: {
        primary: {
          10: { value: '#000000' }, // White for primary elements
          80: { value: '#cccccc' }, // Light gray for hover effects
          100: { value: '#ffffff' }, // White for active elements
        },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '{colors.brand.primary.10}' }, // White button
          _hover: {
            backgroundColor: { value: '{colors.brand.primary.80}' }, // Light gray on hover
          },
          color: { value: '{colors.background.primary}' }, // Black text on buttons
        },
      },
    },
  },
};

// Custom components for Authenticator
const components = {
  Header() {
    return (
      <div style={{ marginTop:'20px', padding: '30px', textAlign: 'center' }}>
        <img
  src="/logo.png"
  alt="Company Logo"
  className="w-36"
  style={{
    maxWidth: '200px',
    margin: '0 auto 10px',
    display: 'block'
  }}
/>
        {/* <h1 style={{ color: '#ffffff' }}>Welcome to My App</h1> */}
      </div>
    );
  },
  Footer() {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#000000' }}>
        <p>© Rakuzon 2024 My Company</p>
      </div>
    );
  },
};

function MainApp() {
  return (
    <ThemeProvider theme={myTheme}>
      <Authenticator  components={components} className="max-w-xl mx-auto mt-20 p-10 bg-gray-300 shadow-md rounded-lg">
        {({ signOut }) => (
          <>
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Navbar signOut={signOut} />
            </div>
            <App />
            <Footer />
          </>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <MainApp />
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);