# ♻ Ecoleta | Next Level Week - feat. Rocketseat

This project was created during the Next Level Week which was taught by the Rocketseat team, in this application it is possible to register collection points and types of materials collected, showing them on maps and allowing you to search for the nearest points.

## 🚀 Index
- ⚙ [Tecnologies](#-tecnologies)
- 💻 [How to use](#-how-to-use)

## ⚙ Technologies
### Back End
    - Javascript
    - NodeJS
    - Typescript
    - SQLite
    - Express
    - Knex
    - Ts-node
    - Ts-node-dev
    - Cors
    - Multer
    - Celebrate/Joi

### Front End Web
    - NodeJs
    - Typescript
    - ReactJS
        - react
        - react-dom
        - react-icons
        - react-leaflet
        - react-router-dom
        - react-scripts
    - Axios
    - Leaflet

### Front End Mobile
    - NodeJS
    - Typescript
    - React Native
        - react
        - react-dom
        - react-native
        - react-native-gesture-handler
        - react-native-maps
        - react-native-picker-select
        - react-native-reanimated
        - react-native-safe-area-context
        - react-native-screens
        - react-native-svg
        - react-native-web
        - react-native-community/masked-view
        - react-navigation/native
        - react-navigation/stack
    - Axios
    - Expo
        - expo-google-fonts/roboto
        - expo-google-fonts/ubuntu
        - expo-constants
        - expo-font
        - expo-location
        - expo-mail-composer

## 💻 How to use

  > Cloning the repository
  ```bash
    # Cloning repository
    git clone https://github.com/pedrofreitaslima/ecoleta.git
  ```

  Copy the `.env.example` and create `.env` with your *IP* and *PORT* informations

  > Running server
  ```bash
    # Accesing server
    cd server

    # Creating tables
    npm run knex:migrate

    # Creating seeds
    npm run knex:seed
    
    # Running server
    npm run dev
  ```

  > Running web project
  ```bash
    # Accesing web project
    cd web
    
    # Running web project
    npm start
  ```

  > Running mobile project
  > You will need to download the Expo app. When the application starts, scan the qrcode with the Expo you installed.
  ```bash
    # Accessing mobile project
    cd mobile

    # Change the IP in services/api.ts to connect with the back end
    cd services

    # Running
    expo start
  ```