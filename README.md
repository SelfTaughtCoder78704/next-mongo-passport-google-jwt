# Component Tracker Example of FullStack Next/Mongo/Passport/Passport-Google/JWT

### In the models folder, you will find the following files:

    - `User.js`: This is the user model.
    - `Component.js`: This is the component model.

### The User object is responsible for storing the following information:

    - `name`: The name of the user.
    - `email`: The email of the user.
    - `accessToken`: The access token of the user.
    - `tokens`: The tokens of the user.
    - `components`: The components of the user. This is an array of component ids.

### The Component object is responsible for storing the following information:

    - `title`: The title of the component.
    - `description`: The description of the component.
    - `creator`: The creator of the component. This is an user id.
    - `files`: The files of the component. This is an array of file ids.
    - `createdAt`: The date of creation of the component.
    - `updatedAt`: The date of last update of the component.

### In the lib folder there are 2 files:

    - `database.js`
    - `passport.js`

`database.js` is the database connection and the `passport.js` is the authentication.

`database.js` expects a `MONGO_URI: process.env.MONGO_URI`

`passport.js` expects the following:
`clientID: process.env.GOOGLE_ID,`
`clientSecret: process.env.GOOGLE_SECRET,`
`callbackURL: 'http://localhost:3000/api/google/callback'`
`JWT_SECRET: process.env.JWT_SECRET`

## TODO: Setup Flow Explained (How it works)
