# telehealth
Telehealth code challenge.  This application consisted of a NodeJS backend writted in typescript and a React frontend written in pure JS.  In order to run the application you'll need to start both the backend and frontend.  See the steps to run below.

### Requirements to run
* Docker v2
* Lerna v3.22+ `npm install --global lerna`
* NodeJs v14+
* Npm 6.14+

### Commands
* `lerna bootstrap` - Install all dependencies
* `lerna run build` - Build all components
* `lerna run start:docker --stream` - Build and starts the application inside a docker container
* `lerna run stop:docker --stream` - Stops the running application
* `lerna run test --stream` - run all unit tests
* `lerna run test:integration --stream` - run the integration tests (web service must be running first)

### How to run the application
1. Clone to repository to your local machine
2. Change the to folder into which the repository was cloned.
3. Install all dependencies `lerna bootstrap`
4. Start the web service and web server `lerna run start:docker --stream`
5. Navigate your browser to http://localhost:8080

### Improvements
#### Application improvements
* For security, secure the backend with OAuth and require the user to login before they can view client information
* Connect it to a real database
* Store client information encrypted at rest
* Use SSL between frontend and backend
* Generate a human friendly client/patient number which is displayed on the frontend
* Capture additional information about the client/patient such as:
  - Middle name
  - Email address
  - Date of birth
  - Physical Address
  - Current GP
  - Next of kin
  - Emergency contact
  - Date they joined
  - Notes
  - Auditing information
* Support search by name, client/patient number, email address, phone number 
* Improve the user experience with input masks (for phone number, email address, etc) and improved validation
* Ability to edit and delete an existing client/patient record
* Frontend error handling

#### Technical improvements
* Setup a CICD build pipeline and have it hosted on the a cloud platform
* Store secrets in a secure location such as AWS Parameter store or secrets manager
* Service monitoring
* Error logging frontend and backend
* Use a linter
* E2E UI Tests
