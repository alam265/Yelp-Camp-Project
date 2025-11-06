# Yelp-Camp-Project

A full-stack web application for discovering, reviewing, and managing campgrounds from around the world.

## Features

- View campground information posted by the community
- Leave reviews and feedback on campgrounds
- Full CRUD (Create, Read, Update, Delete) functionality for campgrounds
- Users can add, edit, and delete reviews
- Image storage powered by [Cloudinary](https://cloudinary.com/)
- Interactive maps using [Mapbox](https://www.mapbox.com/) to display campground locations worldwide
- Follows MVC (Model-View-Controller) architecture for organized code structure
- User authentication and authorization for secure access
- Security best practices implemented

## Technologies Used

- JavaScript (Node.js, Express.js)
- EJS (Embedded JavaScript templates)
- CSS
- MongoDB (database)
- Cloudinary (image storage)
- Mapbox (maps and geolocation)
- Passport.js (authentication)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/alam265/Yelp-Camp-Project.git
   cd Yelp-Camp-Project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - `DATABASE_URL` for MongoDB connection
   - `CLOUDINARY_*` for Cloudinary API keys
   - `MAPBOX_TOKEN` for Mapbox access
   - `SECRET` for session security

4. Run the application:
   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` in your browser.

## Usage

- Browse campgrounds and see their locations on an interactive map
- Register or log in to create, edit, or delete campgrounds
- Add reviews to help other campers

=======

