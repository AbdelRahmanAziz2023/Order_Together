# Order Together 🍽️

A collaborative food ordering mobile app that allows friends and groups to order meals together seamlessly. Built with React Native and Expo, this app enables users to create or join group orders, customize individual items, track payments, and split bills effortlessly.

## 🚀 Features

### Core Functionality

- **Group Ordering**: Create new group orders or join existing ones with passcodes
- **Restaurant Selection**: Browse and select from participating restaurants
- **Menu Navigation**: View restaurant menus with detailed item information
- **Custom Orders**: Customize menu items according to preferences
- **Real-time Cart**: Live cart updates with automatic synchronization
- **Payment Tracking**: Monitor who has paid and split bills fairly
- **Order History**: View past orders and receipts
- **User Profiles**: Manage personal information and preferences

### Technical Features

- **Real-time Updates**: 5-second polling for active cart synchronization
- **Offline Support**: Persistent cart and user data with Redux Persist
- **Responsive Design**: Optimized for both iOS and Android devices
- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Image Handling**: Photo uploads for profiles and receipts
- **Error Handling**: Comprehensive error states and user feedback

## 🛠 Technology Stack

### Frontend Framework

- **React Native 0.81.5** - Cross-platform mobile development
- **Expo SDK ~54.0.24** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript development
- **Expo Router 6.0.15** - File-based routing system

### State Management

- **Redux Toolkit 2.10.1** - Predictable state container
- **Redux Persist 6.0.0** - Persistent state storage
- **RTK Query** - Data fetching and caching

### UI & Styling

- **React Native Reanimated 4.1.1** - Smooth animations
- **React Native Gesture Handler 2.28.0** - Touch gesture handling
- **React Native Safe Area Context 5.6.0** - Safe area management
- **Lucide React Native 0.562.0** - Icon library
- **Custom Fonts** - Sen font family for consistent typography

### Navigation

- **React Navigation 7.x** - Navigation and routing
- **Expo Router** - File-based routing with deep linking

### Storage & Data

- **Async Storage 2.2.0** - Local data persistence
- **Secure Store 15.0.7** - Secure sensitive data storage
- **Redux Persist** - State hydration and persistence

### Development Tools

- **Reactotron** - React Native debugging
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Metro** - JavaScript bundling

### Device Integration

- **Image Picker 17.0.10** - Camera and photo library access
- **Clipboard 8.0.7** - System clipboard integration
- **Haptics 15.0.7** - Tactile feedback
- **Web Browser 15.0.9** - In-app web browsing

## 📁 Project Structure

```
Order_Together/
├── src/
│   ├── app/                    # Expo Router pages and layouts
│   │   ├── (app)/             # Main app tabs (Home, Profile)
│   │   │   ├── (home)/        # Home tab screens
│   │   │   └── (profile)/     # Profile tab screens
│   │   ├── (auth)/            # Authentication screens
│   │   ├── _layout.tsx        # Root layout with providers
│   │   └── index.tsx          # App entry point
│   │
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Shared components (Alert, Text, etc.)
│   │   ├── order/             # Order-specific components
│   │   └── skeleton/          # Loading skeleton components
│   │
│   ├── screens/               # Screen components
│   │   ├── Auth/              # Login, registration screens
│   │   ├── Home/              # Home screen components
│   │   ├── Menu/              # Restaurant menu screens
│   │   ├── OrderDetails/      # Order detail views
│   │   ├── PaymentTracker/    # Payment tracking screens
│   │   ├── Profile/           # User profile screens
│   │   └── ...                # Other feature screens
│   │
│   ├── services/              # API and business logic
│   │   └── api/
│   │       ├── endpoints/     # API endpoint definitions
│   │       ├── baseApi.ts     # Base API configuration
│   │       └── baseQueryWithReauth.ts # Auth wrapper
│   │
│   ├── store/                 # Redux store configuration
│   │   ├── slices/            # Redux slices (user, cart)
│   │   └── store.ts           # Store setup with persistence
│   │
│   ├── types/                 # TypeScript type definitions
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── helper/                # Helper functions
│   └── constants/             # App constants (colors, images)
│
├── assets/                    # Static assets
│   ├── fonts/                 # Custom fonts (Sen family)
│   ├── images/                # App icons and images
│   └── ...                    # Other static resources
│
├── android/                   # Android-specific configuration
├── ios/                       # iOS-specific configuration
├── scripts/                   # Build and utility scripts
└── configuration files        # Package.json, tsconfig, etc.
```

## 🏗 Architecture

### State Management Architecture

The app uses Redux Toolkit with RTK Query for state management:

- **User Slice**: Authentication state and user profile data
- **Cart Slice**: Shopping cart and order state
- **API Slices**: Server state with automatic caching and synchronization

### Navigation Structure

- **File-based Routing**: Uses Expo Router for automatic route generation
- **Tab Navigation**: Main app navigation with Home and Profile tabs
- **Stack Navigation**: Modal and screen-to-screen navigation
- **Deep Linking**: Support for `ordertogether://` scheme

### Data Flow

1. **Authentication Flow**: JWT tokens with automatic refresh
2. **Cart Synchronization**: Real-time polling every 5 seconds for active carts
3. **Offline Support**: Persistent storage for cart and user data
4. **Error Handling**: Comprehensive error boundaries and user feedback

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Order_Together
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   # Add your API keys and configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

### Running the App

Choose your preferred development environment:

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Expo Go**: Scan QR code with Expo Go app
- **Web Browser**: Press `w` for web version

## 📱 Build & Deployment

### Development Builds

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Production Builds

```bash
# Build for App Store
eas build --platform ios

# Build for Google Play
eas build --platform android

# Build for both platforms
eas build --platform all
```

### APK Optimization

The project includes an APK optimization script:

```bash
npm run optimize:images
```

## 🎨 Customization

### Theming

- **Colors**: Defined in `src/constants/colors.ts`
- **Fonts**: Sen font family loaded in root layout
- **Icons**: Lucide React Native with custom icon sets

### Styling Approach

- **StyleSheet API**: React Native's optimized styling
- **Responsive Design**: Safe area handling and device adaptation
- **Custom Components**: Reusable styled components

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Secure Storage**: Sensitive data stored in Secure Store
- **API Security**: Automatic token refresh and retry logic
- **Input Validation**: Client-side validation for all forms

## 🧪 Testing & Quality

- **TypeScript**: Full type safety across the application
- **ESLint**: Code quality and consistency enforcement
- **Error Boundaries**: Graceful error handling and user feedback
- **Loading States**: Skeleton screens for better UX

## 📊 Performance Optimizations

- **Image Optimization**: Compressed images and lazy loading
- **State Persistence**: Selective persistence for performance
- **API Caching**: Intelligent caching with RTK Query
- **Bundle Size Optimization**: Tree shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the [Expo documentation](https://docs.expo.dev/)
- Review the [React Native documentation](https://reactnative.dev/)

## 🔄 Version History

- **v1.0.0** - Initial release with core group ordering functionality
- Real-time cart synchronization
- Payment tracking and bill splitting
- User authentication and profiles
- Restaurant menu browsing

---

Built with ❤️ using React Native and Expo
