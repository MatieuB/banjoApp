### Running the app 

* install node.js and run `localServer/server.js`

Then navigate your browser to `http://localhost:8000/app/index.html` to see the app running in
your browser.



### Running unit tests

Ran out of time. Did not complete a set of unit tests

### End to end testing

Ran out of time. Did not complete a set of E2E tests


## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      lib/              --> angular and 3rd party javascript libraries
        angular/
          angular.js        --> the latest angular js
          angular.min.js    --> the latest minified angular js
          angular-*.js      --> angular add-on modules
          version.txt       --> version number
      partials/             --> angular view partials (partial html templates)
