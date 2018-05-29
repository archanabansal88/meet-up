## GeekSkool-- Meet-Up Project

### Pre-requisites

* Node (v8 or higher)
* Redis (v2.8 or higher)
* Webpack (v4)

### How to run the application Locally

* clone/download the repository: git clone https://github.com/archanabansal88/meet-up.git
* run command "npm i" to install dependencies and devDependencies
* start redis server using 'redis-server' in a terminal
* run command "npm run dev-server" in another terminal to start the express server
* run command "Webpack -w" in another terminal to watch for local js changes
* type localhost:3000 in browser

### Folder Strucuture

├── package.json
├── README.md
├── build  
├── webpack.config.js
├── server   (server side files)
    ├── data
    |   ├── data.json   (mock data to create event)
    ├── handler
    |   ├── admin.js    (saving admin data)
    |   ├── attendee.js (saving and deleting attendees)
    |   ├── comment.js  (saving and deleting comments)
    |   ├── event.js    (creating and displaying event details)
    |   ├── user.js     (saving and getting user information)
    |   ├── utils.js 
    ├── redis.js
    ├── server.js        
├── src       (Client side files)
    ├── app.js 
    ├── components        
    │   ├── admin  
    |   │   └── login.js
    │   |   └── index.js
    │   ├── content  
    |   │   └── content.js
    │   |   └── index.js
    │   ├── createEvent  
    |   │   └── createevent.js
    │   |   └── index.js
    │   ├── dateThumbnail  
    │   |   └── index.js
    │   ├── eventAttendees  
    |   │   └── attendees.js
    │   |   └── index.js
    │   ├── eventCard  
    |   │   └── eventcard.js
    │   |   └── index.js
    │   ├── eventComments  
    |   │   └── comments.js
    │   |   └── index.js
    │   ├── eventContainer  
    |   │   └── eventcontainer.js
    │   |   └── index.js
    │   ├── eventDescription  
    |   │   └── description.js
    │   |   └── index.js
    │   ├── eventDetails  
    |   │   └── eventdetails.js
    |   │   └── eventconfirm.js
    |   │   └── map.js
    │   |   └── index.js
    │   ├── eventTitle  
    |   │   └── title.js
    │   |   └── index.js
    │   ├── googleOauth  
    |   │   └── googleOauth.js
    │   |   └── index.js
    │   ├── header  
    |   │   └── header.js
    │   |   └── index.js
    │   ├── logout  
    |   │   └── logout.js
    │   |   └── index.js
    │   ├── mainContainer  
    |   │   └── main.js
    │   |   └── index.js
    ├── config
    │   └── index.js 
    ├── helper
    │   └── http.js 
    └── shared
    │   ├── button  
    |   │   └── button.js
    │   |   └── index.js
    │   ├── carousel  
    |   │   └── carousel.js
    │   |   └── index.js
    │   ├── input  
    |   │   └── input.js
    │   |   └── index.js
    │   ├── popup  
    |   │   └── popup.js
    │   |   └── index.js
    │   ├── textarea  
    |   │   └── textarea.js
    │___|   └── index.js
        