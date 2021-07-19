# Harbinger - Hackathon Write-Up

Harbinger is a cross platform deployment manager for the Akash network. It directly interfaces with the Akash CLI via a REST API hosted locally on your system, which by nature grants you absolute control over your keys, deployments, and data. Nothing is ever stored on a central server and you own your data. 


Harbinger is completely open source, transparent, and uses whatever version of Akash CLI that is installed on your system path to execute commands. This approach allows users to audit both Harbinger and Akash code bases to ensure nothing fishy is going on and commands are doing what they say they are doing.


Harbinger is very early in development and in its current state, allows wallets to be created, deleted, imported, and read. With a valid wallet, a user can view details about its balance and generate certificates if the wallet has sufficient funds.


## Technical

Harbinger utilizes a SQLite, Express, Vue, Node (SEVN) stack to interface with the Akash CLI and provide visualization. The backend hosts an Express REST API with endpoints that correspond to different Akash CLI commands. For example, sending a POST request to http://localhost:3000/akash/keys will generate a new private key or wallet and store it in the default secure location depending on the OS, as is the default behavior of the Akash CLI. 


A typical data flow model starts with the front end sending a request to an API endpoint. The backend then uses middleware to verify that the data has all the required fields and does not contain invalid input before translating the request into an Akash CLI command. Once the command is constructed, a shell is spawned as a child process and the command is run. All commands are sent with the —output json flag set so that when the process returns output through stdout it can easily be parsed into a JavaScript object using JSON.parse. At this point, the command has been run and output has been received and parsed to be sent in a response back to the frontend for it to display and manipulate as it wishes.


Currently, the SQLite database is not being used, but the boilerplate to start using it is in place. It’s anticipated use case is to store app preferences or serve as a jumping off point if the backend API is ever hosted on the internet (through Akash of course :D). TypeORM is used to interface with the SQLite database, however due to TypeORM’s flexibility it is possible for anyone to swap out the SQLite database for another database such as MySQL or MongoDB.


Most of my backend development process used test driven development written using Mocha, Chai, and Superagent in hopes that if someone wanted to fork or contribute to this code they could test their newly added functionality works and integrates with the existing code base.


The frontend uses Electron & Vue with Vuex and Vuetify for managing global app data and providing a visually appealing interface for users to interact with (I am a horrible artist :P). Electron allows the app to be served as a cross platform desktop app or web app.


## Hackathon Notes / Future Work

A lot of my focus during the Hackathon was spent on the modular backend framework and as such, the frontend and documentation need some work. The backend still needs endpoints to support Akash deployments, bids, leases, minifests, and logs, which could be achieved relatively easily given more time due to the backends modularity and flexability. This also means the frontend will need improvements to support such operations, which I am initially thinking will consist of a series of forms that will make interfacing with the underlying Stack Definition Language easier. TLDR, I was able to create a good skeleton that can be used to effectively implement the rest of the deployment features.

I would like to apply for funding for this project or continue working on it given enough community support. I have not researched how to start the funding process, but will do so shortly after submission.