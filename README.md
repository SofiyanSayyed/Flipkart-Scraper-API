# Flipkart-Scraper-API
This Node.js project provides a web API built using Express.js, which allows users to submit Flipkart product URLs. The application scrapes essential product details from the provided URLs using Cheerio, a web scraping library and saves the scraped data into a Postgres database with proper schema.
This Node.js project involves the creation of a robust API using Express.js, facilitating user registration and login via JWT-based authentication using email and password.
The project also encompasses the implementation of a POST API capable of processing Flipkart URLs provided as payloads. Leveraging the Axios library, the application fetches webpage content from the provided URLs. Utilizing Cheerio, the project performs web scraping to extract essential product details including title, price, description (if available), number of reviews and ratings, ratings, and the count of media elements within the product display box. This extracted information is systematically stored in a MongoDB database, establishing associations with user profiles.

Tasks
1. Create an API that lets users signup and log in through JWT-based
authentication using email and password. (make sure only to use JWT
authentication)
2. Create a post API that takes a Flipkart url as payload, and scrapes the below-given
fields, and saves them in Postgres with proper schema with user info. This
should work only if a user is logged in, else proper error message should be
shown.
3. Check If the URL corresponding to the logged-in user is already present in the
DB, and return from the DB. If the URL is not present or does not belong to a
logged-in user show a proper error message.
Use proper db schemas and class-based views in Django.
Fields to be scraped.
- Title
- price
- Description if it is present
- Number of reviews and ratings
- Ratings
- The number of media counts present in the product display box.


