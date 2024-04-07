const express = require('express')
const { valid } = require('joi/lib/types/alternatives')
const app = express()

app.use(express.json())

const Courses = [
    {name:"Course1",id:1},
    {name:"Course2",id:2},
    {name:"Course3",id:3}
]










//************************************************Get Method******************************************

app.get("/",(req,res)=>{
    res.send("Hello from server... This is Adnane!,1st Commit,2nd commit")

})

//Show all the available courses from an array
app.get("/Courses",(req,res)=>{
    res.send(Courses)
})

//Searching for a course in an array of courses
app.get("/Courses/:id",(req,res)=>{
    const Course = Courses.find(c=>c.id === parseInt(req.params.id))
    if(!Course) res.status(404).send("The Course was not found")
    res.send(Course)
})














//************************************************Post Method******************************************

app.post("/api/Courses",(req,res)=>{
    if(!req.body.name){
        res.status(400).send("Course Name is required")
        return;
    }
    const Course = {
        id : Courses.length + 1,
        name : req.body.name
    };
    Courses.push(Course)
    res.send(Course)
});















//************************************************Put Method******************************************

app.put("/api/Courses/:id",(req,res)=>{
    
    //Search if the id exists in the courses array or not
    const Course = Courses.find(c=>c.id === parseInt(req.params.id))
    if(!Course){
        res.status(404).send("This course dosen't exist")
        return;
    }

    
    //Check weither the new name is valid or not
    if(!req.body.name){
        res.status(400).send("Course Name is required")
        return;
    }


    //The update logic
    Course.name = req.body.name;
    res.send(Course);

})

// function validateCourse(Course){
//     if(!Course.name){
//         res.status(400).send("Course Name is required")
//         return;
//     }
//     return Course;
// }











//************************************************Delete Method******************************************

app.delete("/api/Courses/:id",(req,res)=>{
    const Course = Courses.find(c=>c.id === parseInt(req.params.id))
    if(!Course){
        res.status(404).send("The Course dosen't exist");
        return;
    }

    const index = Courses.indexOf(Course);
    Courses.splice(index,1)
    res.send(Course);
    
})
app.listen(2000);