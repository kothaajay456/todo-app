const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Todo = require("./models/Todos.js");
const app = express();
const port = 3000;
url="mongodb://127.0.0.1:27017/todoApp";
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
// Middleware
async function main() {
    try {
        await mongoose.connect(url);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}
main();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
// In-memory array to store todos
// Routes

// Show todo form and list
app.get("/", async(req, res) => {
 const todos= await Todo.find({});
  res.render("Todos/index", { todos });
});
app.post("/todos/:id/done",async(req,res)=>{
  const {id} =req.params;
await Todo.findByIdAndUpdate(id,{completed:true});
res.redirect("/")
})
app.delete("/todos/:id",async(req,res)=>{
  const {id}=req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/")
})
// Handle form submission
app.post("/todos", async(req, res) => {
  const { title, description, dueDate } = req.body;
  await Todo.create({title,description,dueDate});
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
