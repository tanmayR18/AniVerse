
#  AniVerse

An Anime review website for all the weebs for searching and rating & reviewing the anime series.
## Tech Stack

**Client:** 
- React.js
- Tailwind CSS
- Redux toolkit

**Server:** 
- Node.js -  Express.js
- MongoDB 
- Rest API

**API:**
- Jikan API -  https://jikan.moe/




## Example

![Screenshot (613)](https://github.com/tanmayR18/AniVerse/assets/135257857/b3fa4a18-9875-4ac3-a867-c8e6d6856bd5)


![Screenshot (614)](https://github.com/tanmayR18/AniVerse/assets/135257857/294ccd90-7975-4e75-9355-0aaaea6f78da)

![Screenshot (615)](https://github.com/tanmayR18/AniVerse/assets/135257857/f95b343e-261c-4bcf-9a90-03a1cd24a498)

![Screenshot (617)](https://github.com/tanmayR18/AniVerse/assets/135257857/c7672c8e-d37a-4017-8637-68cb3b736a18)





## Features

- Authentication and Authorization of user
- Verification of email before signUp
- Protected Routes 
- Profile updations 
- JWT for keeping user logged In
- Encryption of password 
- Verification and acknowledge using OTP
- Validated Forms 
- Rating and Review for logged in users 


## Run Locally

- Clone the project in your local device 
- Open the project in your favourite code editor
- Open terminal and add the following commands  
        1. `npm i` or `npm install`  
        2. `npm run dev`  
        
- Get and add the environment variable given below
- The project will be automatically open in your default browser on the localhost:3000
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Frontend:**

`REACT_APP_BASE_URL` - Eg: http://localhost:4000/api/v1

`REACT_APP_RECAPTCHA_SITE_KEY` - optional

**Backend:**

`MAIL_HOST` - from nodemailer

`MAIL_USER` - from nodemailer

`MAIL_PASS` - from nodemailer

`JWT_SECRET` - any word

`CLOUD_NAME` - from cloudinary

`API_KEY` - from cloudinary

`API_SECRET` - from cloudinary

`FOLDER_NAME` - any folder name 

`DATABASE_URL` - Mongodb url

`PORT` - any port number expect 3000


## Deployment

Frontend - Vercel: https://ani-verse-18.vercel.app/

Backend - Render


Note: Due to use of free tier of Backend service from render.com there is delay in the reponse for the first request from the render as the server is not running all the time.

