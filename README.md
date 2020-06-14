# telehealth
Telehealth code challenge

### Requirements to run
* Lerna v3.22+ `npm install --global lerna`
* NodeJs v14+
* Npm 6.14+

### Commands
* `lerna bootstrap` - Install all dependencies
* `lerna run start --stream` - Starts the web service and web client
* `lerna run test:web-client --stream` - run the web client unit tests
* `lerna run test:web-service --stream` - run the web service unit tests
* `lerna run test:integration --stream` - run the integration tests (web server must be running first)

### How to run the application
1. Install all dependencies `lerna bootstrap`
2. Start the web service and web server `lerna run start`
3. Navigate your browser to http://localhost:8080

### Improvements
#### Application improvements
* For security, secure the backend with OAuth and require the user to login before they can view client information
* Connect it to a real database
* Store client information encrypted at rest
* Use SSL between frontend and backend
* Generate a user friendly client or patient number which is displayed on the frontend
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
* Use a linter
