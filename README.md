# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Update base URL for backend app. open `App.ts` and set `BASE_URL`

- if using simulator, use localhost in base URL
   ```
   BASE_URL = 'http://localhost:8000/';
   ```

- if using expo go on your cell phone, use the IP address of the machine which is running backend app.
   ```
   BASE_URL = 'http://192.168.1.8:8000/';
   ```
   

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Future Work

1. Implement validation for each field.
2. Implement paginated load for data. Currently loads all the data.
3. Add tests.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

