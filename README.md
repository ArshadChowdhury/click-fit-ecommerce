# Click Fit

## Here's a glimpse of the app -

![image](https://github.com/ArshadChowdhury/click-fit-frontend/assets/86738490/462e8d0f-cb00-461c-8e50-95a898ff55f1)

## Getting Started Locally

After cloning the project, make sure you have nodejs installed on your computer,

Then install the needed packages from npm by running:

```bash
npm install
# or
yarn install
```

Then run the development server by using:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the webpage and interact with it.

Must mention that no other routes work except the home route for now.

# MYSQL script

## A script named add_user.sql is there

Make sure you have mysql installed locally

To run the script go to the root folder of this project then run

```
Get-Content add_user.sql | mysql -u root -p
```

Then it'll ask for permission to your root account in order to insert the values defined in the add user function
If you want to use any other user simply replace the root with your username
