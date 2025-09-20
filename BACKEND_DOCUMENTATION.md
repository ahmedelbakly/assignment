
# 🏠 Apartment Listing Backend Documentation

This document describes the backend API for the Apartment Listing Project.
The backend is built using Node.js, Express.js, TypeScript, and MongoDB.

## 📦 Tech Stack

Backend: Node.js, Express.js, TypeScript

Database: MongoDB

ODM: Mongoose

Other Tools: Axios, Yup, Docker

## 🔑 Features

Create, read, and list apartments

Search apartments by title, description, location, or project

Filter apartments by price, bedrooms, bathrooms, size, location, project, availability, and amenities

Pagination support for apartment listings

Fetch distinct filter options for frontend filters

⚙️ Setup Instructions

Clone the repository:

git clone <https://github.com/ahmedelbakly/assignment.git>
cd assignment

Install dependencies:

npm install

Create a .env file in the root directory with:

MONGO_URI=your-mongodb-uri
PORT=4000

Start the backend server:

npm run dev

Or use Docker Compose:

docker-compose up --build

Open your browser or API client and navigate to <http://localhost:4000> (or the configured port)

## 🗂️ API Endpoints

1. Create Apartment

URL: /api/apartments

Method: POST

Body Example:

{
  "title": "Modern Apartment",
  "description": "Spacious 2-bedroom apartment",
  "price": 3200,
  "location": "Miami Beach",
  "project": "Seaside Villas",
  "unitNumber": "D-502",
  "bedrooms": 2,
  "bathrooms": 2,
  "size": 120,
  "isAvailable": true,
  "amenities": ["Pool", "Gym"],
  "imageUrl": "<https://example.com/image.png>"
}

Success Response:

{
  "message": "Apartment created successfully",
  "apartment": { ...apartmentObject }
}

2. Get All Apartments

URL: /api/apartments

Method: GET

Query Parameters (optional):

Parameter Type Description
search string Search by title, description, or location
page number Page number for pagination
limit number Number of results per page
minPrice number Minimum price
maxPrice number Maximum price
minBedrooms number Minimum bedrooms
maxBedrooms number Maximum bedrooms
minBathrooms number Minimum bathrooms
maxBathrooms number Maximum bathrooms
minSize number Minimum size (sqm)
maxSize number Maximum size (sqm)
location string Filter by location
project string Filter by project
isAvailable boolean Filter by availability
amenities array Filter by amenities

Success Response:

{
  "data": [ ...apartmentObjects ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}

3. Get Apartment by ID

URL: /api/apartments/:id

Method: GET

Success Response:

{
  "id": "64f0a9c8b1234a0012345678",
  "title": "Modern Apartment",
  "description": "Spacious 2-bedroom apartment",
  "price": 3200,
  "project": "Seaside Villas",
  "location": "Miami Beach",
  "bedrooms": 2,
  "bathrooms": 2,
  "size": 120,
  "isAvailable": true,
  "amenities": ["Pool", "Gym"],
  "unitNumber": "D-502",
  "imageUrl": "<https://example.com/image.png>",
  "floor": 2,
  "yearBuilt": 2021,
  "createdAt": "2025-09-20T12:00:00.000Z",
  "updatedAt": "2025-09-20T12:00:00.000Z"
}

4. Get Filter Options

URL: /api/apartments/filters

Method: GET

Success Response:

{
  "locations": ["Miami Beach", "Los Angeles"],
  "projects": ["Seaside Villas", "Sunset Towers"],
  "amenities": ["Pool", "Gym", "Parking"],
  "minPrice": 1000,
  "maxPrice": 5000,
  "minBedrooms": 1,
  "maxBedrooms": 5,
  "minBathrooms": 1,
  "maxBathrooms": 3,
  "minSize": 50,
  "maxSize": 200
}

## 📝 Backend Architecture Notes

Controllers: Handle HTTP requests and responses; call service methods

Services: Contain all business logic (e.g., filtering, search, pagination)

Models: Define MongoDB schemas and types

Filters: Implemented with MongoDB queries and regex for text search

Pagination: Default page = 1, limit = 10, configurable per request

Error Handling: Errors are passed to Express error middleware
