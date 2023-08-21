# Backend API for Task Manager App

This repository contains the backend API for a task manager application. The API provides various features for managing users, tasks, and more. It is built using Node.js, Express.js, and MongoDB.

## Features

- Create, update, delete, and retrieve user information
- User authentication: login and logout
- Send emails
- Upload images
- Create, update, delete, and retrieve tasks
- Testing features

## Tech & Tools

The project is built using the following technologies and tools:

<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="Node" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="Mongose" src="https://img.shields.io/badge/Mongose-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="Visual Studio Code" src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white"/>

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Clone the Project

```sh
git clone https://github.com/AbdelrahmanBayoumi/tasks-manager-api.git
cd tasks-manager-api
```

### Install Dependencies

Use npm to install the required dependencies.

```sh
npm install
```

### Run the Server

Start the server using the following command:

```sh
npm run start
```

### Run the Development Server

To run the server in development mode (using nodemon for automatic server restarts), use the following command:

```sh
npm run dev
```

## Dependencies

The project uses the following dependencies:

- **bcryptjs**: Library for hashing passwords and data securely.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: Implements JSON Web Tokens for user authentication.
- **mongodb**: Official MongoDB driver for Node.js.
- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **morgan**: HTTP request logger middleware for Node.js.
- **multer**: Middleware for handling `multipart/form-data` (used for file uploads).
- **nodemailer**: Sends email from Node.js applications.
- **sharp**: High-performance image processing library.
- **validator**: Library for string validation and sanitization.

## .env.sample

Before running the project, make sure to create a `.env` file in the root directory and provide the following environment variables:

```plaintext
JWT_SECRET=testSecret
DATABASE_URL=mongodb://127.0.0.1:27017/task-manager
EMAIL=test@gmail.com
EMAIL_PASS=3892018390218
```

Replace the values with appropriate settings for your environment. The `.env` file contains sensitive information, so make sure to keep it private and never commit it to version control.
