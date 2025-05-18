const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json()); // middleware to parse json
// data from request body
//
connectDB(); // connect to database
app.use("/api/auth", userRoutes); // use user routes

app.get("/", (req, res, next) => {
  // logic
  return res.status(200).send("Hello World!"); // return to client
});

app.get(
  "/post/:postid", // if second path is dynamic, use : before the name
  (req, res) => {
    let postId = req.params.postid; // get the dynamic path value
    console.log(postId);
    let name = req.query.name; // get the query string value
    let age = req.query.age; // get the query string value
    console.log(name, age);
    return res.status(200).send("Success"); // return to client
  }
);

// CRUD application / Request/ API
// Create, Read, Update, Delete
let blogs = [
  { id: 1, title: "Blog 1", content: "Content 1" },
  { id: 2, title: "Blog 2", content: "Content 2" },
  { id: 3, title: "Blog 3", content: "Content 3" },
];

//GET ALL
app.get("/blogs", (req, res) => {
  //fetch all blogs from database
  return res.status(200).json({
    success: true,
    blogs: blogs,
    message: "Data fetched successfully",
  }); // return all blogs to client
});

//GET ONE
app.get("/blogs/:blogId", (req, res) => {
  //fetch blog by id from database
  let blogId = req.params.blogId; // get the dynamic path value
  let found;
  for (blog of blogs) {
    if (blog.id == blogId) {
      found = blog;
      break;
    }
  }
  if (found) {
    return res.status(200).json({
      success: true,
      blog: found,
      message: "Data fetched successfully",
    }); // return blog to client
  } else {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    }); // return error to client
  }
});

//ADD
app.post("/blogs/", (req, res) => {
  //add blog to database
  console.log("Client send", req.body); // get the request body
  const { id, name, title, desc } = req.body;
  if (!id || !name || !title || !desc) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    }); // return error to client
  } // return new blog to client
  blogs.push({ id, name, title, desc }); // add blog to database
  return res.status(201).json({
    success: true,
    blog: { id, name, title, desc },
    message: "Blog added successfully",
  }); // return new blog to client
});

//UPDATE put/patch
app.put("/blogs/:blogId", (req, res) => {
  let blogId = req.params.blogId; // get the dynamic path value
  let foundIdx;
  //finding index of foung blog
  for (blogIdx in blogs) {
    if (blogs[blogIdx].id == blogId) {
      foundIdx = blogIdx;
      break;
    }
  }
  const { name, title, desc } = req.body;
  blogs[foundIdx].name = name;
  blogs[foundIdx].title = title;
  blogs[foundIdx].desc = desc;
  return res.status(200).json({
    success: true,
    message: "Blog updated successfully",
  }); // return updated blog to client
});

//DELETE
app.delete("/blogs/:blogId", (req, res) => {
  let blogId = req.params.blogId; // get the dynamic path value
  blogs = blogs.filter((blog) => blog.id != blogId); // remove blog from database
  return res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

app.listen(
  3000, // port -> localhost:3000
  () => {
    console.log("Server is running on port 3000");
  }
);
