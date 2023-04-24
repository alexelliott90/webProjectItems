### how to use the web project items server

### Opening and running the API

Navigate to the folder on your machine containing the project

Type npx nodemon .\webProjectItems_server.js

### Testing the API on Postman

### Port

The API is run on port 8080. Type the following into postman to access the correct port:
http://localhost:8080/

- To access the full API select 'GET' and:
http://localhost:8080/api

This will return the entire json object containing the list of projects

### Greeting Message

- To access the greeting message select 'GET' and:
http://localhost:8080/hello

### Getting a list of projects

- To retrieve the list of projects, select GET and:
http://localhost:8080/projectsList

### Adding projects

- To add a new project, select 'POST' and:
http://localhost:8080/project/?id=id&title=title&description=description&URL=URL

for example: http://localhost:8080/project/?id=1&title=my project&description=the description&URL=www.project.com

This will add a new project to the projects list with the parameters specified

### Deleting projects

- To delete a project, select 'DELETE' and:
http://localhost:8080/project/?id=id

for example: http://localhost:8080/project/?id=1

This will delete the project with the id of the id specified

### Editing projects

- To edit a project, select 'PUT' and:
http://localhost:8080/project/?oldId=oldId&id=id&title=title&description=description&URL=URL

for example: http://localhost:8080/project/?oldId=2newId=1&newTitle=my project&newDescription=the description&newURL=www.project.com

This will change the item with id of 'oldId' to take the values of the newId, newTitle, newDescription and newURL as specified.

You can decide to include or exclude any of the newId, newTitle, newDescription and newURL variables. For example, if you do not want to update the description, then do not include the newDescription in your url.



