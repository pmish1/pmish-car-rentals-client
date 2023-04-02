Avaliable at: https://main--gorgeous-yeot-dafbca.netlify.app/

API avaliable at: https://github.com/pmish1/pmish-car-rentals-api

**DEMO ACCOUNTS**

- test@test.com password: test
- test2@test.com password: test2
*Or register your own account*


This is a MERN stack application with responsive web design to facilitate listing
management for a car-rental company. There is user authentication and authorization for listing creation,
update, and deletion. Customers are able to browse available listings and create reservations via the platform.

**TECH STACK**

- Front-end: ReactJS for dynamic functionality in web applications. Tailwind CSS framework to ensure consistent and responsive styling across multiple web pages and devices.
- Back-end: NodeJS, MongoDB with JsonWebToken to develop secure and efficient RESTful API to handle data storage, data retrieval and user authentication.
AWS S3 buckets with custom policy to enable seamless image uploads.

**CORE FUNCTIONALITY**

*Login/registraion*: Passwords are hashed using the 'bcrypt' library for NodeJS and stored along with username and email the database. Upon logging in, the user and some user info is stored in context 
and cookies for the website. Cookies are set using JsonWebTokens. 

*Creating/updating/deleting listing*: The client communicates with the server/api using PUT, DELETE and POST requests, passing the requried data to the server. On the server, listings are created/updated 
using MongoDB's database functions. 

*Creating reservations*: Similar to creating/updating listings, the client communicates with the server using POST requests. In turn, the server handles the requests by creating/saving reservations with relevant data
into the database. 

*Viewing listings/reservations/posts*: The client communicates with the server using GET requests. The server, in turn, responds with the relevant data. Authorization is handled on the front-end by checking context/cookies in 
situations where data can only be provided to those who have an account (or are logged in). 

*Image uploads*: Images are uploaded to an AWS S3 bucket and a url for each image is returned. These are saved into the corresponding posts in the database. 