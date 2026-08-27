import express from 'express'

const app = express();
const PORT = 5000;

app.get("/", (req, res) =>{
    res.send("Hello from node.js server")
})
app.get("/health", (req, res) =>{
    res.send({message: "Server is healthy..."})
})

app.get("/users", (req, res) =>{
    res.send({user: ["Anil", "Babu", "babu ki babu"]})
})

app.listen(PORT, (error) =>{
    if(error){
        console.log(error)
        return
    }
    console.log("server is running on port", PORT)
})