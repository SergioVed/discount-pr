# Discount PR

Discount PR is a backend API for managing restaurant discount offers. It supports restaurant data imported from Google Place details, user registration, restaurant ownership requests, and special offers that can be created by restaurant managers or administrators.

## Features

- JWT-based authentication for admins and managers
- Google Place details synchronization
- Invitation-based manager registration
- User activation and role-based access control
- Restaurant creation from Google Place IDs
- Restaurant profile updates
- Special offer creation and listing
- PostgreSQL persistence with Sequelize
- Request validation and centralized application errors

## Tech Stack

### Server

- NestJS
- TypeScript
- PostgreSQL
- Sequelize / Sequelize TypeScript
- JWT
- Bcrypt
- Class Validator / Class Transformer
- Google Places API integration

## Project Structure

```txt
discount-pr/
  server/        NestJS API server
  README.md      Project documentation
```

## Requirements

Before running the project, make sure you have installed:

- Node.js
- npm
- PostgreSQL

You also need access to:

- A PostgreSQL database
- Google Places API credentials

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd discount-pr
```

Install server dependencies:

```bash
cd server
npm install
```

## Environment Variables

The server uses environment files based on `NODE_ENV`.

For development, create or update:

```txt
server/.env.development.local
```

Required variables:

```env
PORT=7000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

FRONTEND_URL=http://localhost:3000

ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
BCRYPT_ROUNDS=12

GOOGLE_API_KEY=your_google_api_key
GOOGLE_GETPLACE_DETAILS_URL=https://maps.googleapis.com/maps/api/place/details/json
```

> Note: Keep real secrets private. Do not commit production passwords, token secrets, or Google API keys.

## Running the Project

Start the server in development mode:

```bash
cd server
npm run start:dev
```

The server runs on:

```txt
http://localhost:7000
```

If `PORT` is set in the environment file, the server uses that value instead.

## API Examples

Base API URL:

```txt
http://localhost:7000
```

Protected endpoints require an access token in the `Authorization` header:

```txt
Authorization: Bearer <accessToken>
```

### Auth

#### Login

```txt
POST /auth/login
```

```json
{
  "email": "manager@example.com",
  "password": "password"
}
```

#### Register With Invite

```txt
POST /auth/register/:token
```

```json
{
  "firstName": "Alex",
  "lastName": "Manager",
  "email": "manager@example.com",
  "password": "password"
}
```

### Users

User endpoints are available for activated admin users.

#### Get All Users

```txt
GET /users
```

#### Activate User

```txt
PUT /users/:id
```

### Restaurants

Restaurant creation and updates are available for activated admin users. Restaurant sync is available for activated admins and managers.

#### Create Restaurant From Google Place

```txt
POST /restaurants
```

```json
{
  "googlePlaceId": "ChIJN1t_tDeuEmsRUsoyG83frY4"
}
```

#### Get All Restaurants

```txt
GET /restaurants
```

#### Update Restaurant

```txt
PUT /restaurants/:id
```

```json
{
  "name": "Restaurant Name",
  "types": ["restaurant", "food"],
  "googlemapsLink": "https://maps.google.com/example",
  "address": "Main Street 1",
  "phoneNum": "+31 20 000 0000",
  "openingHours": {
    "weekday_text": ["Monday: 09:00 - 18:00"]
  },
  "priceLevel": 2,
  "websiteLink": "https://example.com",
  "description": "Short restaurant description"
}
```

#### Sync Restaurant From Google

```txt
PUT /restaurants/sync/:id
```

### Requests

#### Update Claim Request

```txt
PUT /requests/:id
```

```json
{
  "status": "ACCEPTED"
}
```

Allowed `status` values:

```txt
ACCEPTED
DECLINED
```

### Offers

Offer creation is available for activated managers and admins. Listing all offers is available for admins. Listing restaurant offers is available for admins and managers.

#### Create Offer

```txt
POST /offers
```

```json
{
  "restaurantId": 1,
  "title": "20% off lunch",
  "description": "Discount for weekday lunch orders.",
  "isActive": true,
  "activeFrom": "2026-05-01T00:00:00.000Z",
  "activeTo": "2026-05-31T23:59:59.000Z"
}
```

#### Get All Offers

```txt
GET /offers
```

#### Get Restaurant Offers

```txt
GET /offers/:restaurantId
```

## Available Scripts

### Server

```bash
npm run start       # Start the NestJS server
npm run start:dev   # Start the server in watch mode
npm run build       # Build the server
npm run start:prod  # Run the built server
npm run lint        # Run ESLint
npm run format      # Format source and test files with Prettier
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run test:cov    # Run tests with coverage
```

## Main Routes

### Server Modules

- `auth` - login and invite-based registration
- `invites` - manager invite creation and listing
- `users` - user listing and activation
- `restaurants` - restaurant creation, updates, listing, and Google sync
- `requests` - restaurant claim request workflow
- `offers` - restaurant special offers

## Authentication

The API uses JWT authentication. Access tokens are sent in the `Authorization` header.

Role-based guards restrict protected routes to the required roles:

```txt
ADMIN
MANAGER
```

Some protected routes also require the user account to be activated.

## Development Notes

- The server uses `server/.env.${NODE_ENV}.local` for configuration.
- `npm run start:dev` sets `NODE_ENV=development`.
- The default server port is `7000`.
- Sequelize is configured with `synchronize: true` for local schema synchronization.
- Restaurant data can be created and refreshed from Google Place details.
- Invite tokens expire one hour after creation.

## Build

Build the server:

```bash
cd server
npm run build
```

Run the production build:

```bash
npm run start:prod
```

## License

This project is private and unlicensed.
