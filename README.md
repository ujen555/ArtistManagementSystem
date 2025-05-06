1.To set up the database:
    Set up the database using the query provided in the SQL file located at /server/database/ams_db.sql. Ensure that the database name is 'ams_db'. If the database name is different, modify the .env file accordingly.


2.To run the frontend:
    a> Go inside the frontend directory and run npm install.
    b> Configure the .env file of the frontend with the server's running URL:
    Example: VITE_BASE_API_URL=http://localhost:3000/
    c> Then run npm run dev

3.To run the server:
  a> Go inside the server directory and run npm install.
  b> Configure the .env file of the server:
        PORT: The port on which the server will run.
        DB_HOST: The hostname of the database.
        DB_USER: The database user.
        JWT_SECRET: Your own generated secret key.
        DB_NAME: The database name.
        DB_PASSWORD: The database password.

        Example:
        PORT=3000
        DB_HOST="localhost"
        DB_USER="root"
        DB_PASSWORD=""
        DB_NAME="ams_db"
        JWT_SECRET='ehJf@2Vmz#TnD7Kw$YP4aQ!sLxM^19gVcRu&EwHbZnOj0+qCt*GpLdBbAjX'
  c> Then run npm run start.













    
