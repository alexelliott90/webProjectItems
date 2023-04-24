const express = require('express')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 8080
const cors = require("cors")
app.use(cors())

//bodyparser to allow json objects to be passed to the server
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// greet the user with name if they included it, otherwise use basic greeting
app.get('/hello', (req, resp)=>{
    const name = req.query.name
    if (!id){
        resp.send('Hello')
    }else{
        resp.send('Hello, ' + name)
    }
})

// get the list of projects
app.get('/api', (req, resp)=>{
    const projects = getProjects()
    resp.send(projects)
})

// utility function - gets projects data, and creates the file if it doesn't exist
function getProjects(){
    try {
        const content = fs.readFileSync('projectItems.json')
        return JSON.parse(content)
    }catch(e){ // file non-existent
        fs.writeFileSync('projectItems.json', '[]')
        return []
    }
}

// function to add a project
function addProject(id, title, description, URL){
    const projects = getProjects()
    projects.push({id:Number(id),"title":title, "description":description, "URL":URL})
    fs.writeFileSync('projectItems.json', JSON.stringify(projects))
}

//function to delete a project
function deleteProject(index){
    const projects = getProjects()
    projects.splice(index, 1)
    fs.writeFileSync('projectItems.json', JSON.stringify(projects))
}

// create new project
app.post('/project/', (req, resp)=>{
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const URL = req.body.URL
    const projects = getProjects()
    let counter = 0

    //check json to see if project with this id exists
    for(let i=0; i < projects.length; i++){
        if(projects[i].id == id){
            counter ++
        }
    }

    //if it exists, send response, if not, add project
    if (counter > 0){
        resp.send(`Project with id:${id} already exists`)
    }else{
        resp.send('Success, added project')
        addProject(id, title, description, URL)
    }
})

// update project
app.put('/project/', (req, resp) => {
    console.log("hello")
    const id = req.body.id
    const newDescription = req.body.description
    const newURL = req.body.URL
    const projects = getProjects()
    let index = -1

    //search projects to find the index of the correct project to change
    for(let i=0; i < projects.length; i++){
        if(projects[i].id == id){
            index = i
        }
    }

    if (index > -1){
        //set new values for the project, depending on which variables user decides to change
        if(newDescription!=null){
        projects[index].description = newDescription}
        if(newURL!=null){
        projects[index].URL = newURL}
        
        fs.writeFileSync('projectItems.json', JSON.stringify(projects))
        resp.send('Success, updated project')
    }else{
        resp.send('Project does not exist')
    }
})

// return a list of projects
app.get('/projectsList/' , (req, resp)=>{
    const projects = getProjects()
    let projectList = "The list of Projects is:\n"
    for(let i=0; i < projects.length; i++){
        projectList = projectList + `id:${projects[i].id} title:${projects[i].title}\n`
        } 
    resp.send(projectList)   
})

// check whether project exists
app.get('/project/', (req, resp)=>{
    const id = req.query.id
    const projects = getProjects()
    let counter = 0
    let title =""
    //search projects to find the id, using a counter to define whether specific project exists
    for(let i=0; i < projects.length; i++){
        if(projects[i].id == id){
            counter ++
            title = projects[i].title
        }
    }
    //if project is found, respond that it exists
    if(counter > 0){
        resp.send(`Project Id: ${id}, Title: "${title}" exists`)
    }else{resp.send(`Project ${id} doesnt exist`)}
})

// delete project
app.delete('/project/', (req, resp) => {
    console.log(req.body.title)
    const title = req.body.title
    const projects = getProjects()
    let index = -1

    //search projects to find the index of the specific project
    for(let i=0; i < projects.length; i++){
        if(projects[i].title == title){
            index = i
        }
    }

    if (index > -1){
        deleteProject(index)
        resp.send(`${index} Success, deleted project`)
    }else{
        resp.send('Project does not exist')
    }
})

app.listen(port, ()=>console.log('Listening engaged'))
