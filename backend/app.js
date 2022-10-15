const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/books", router); // localhost:5000/books

const port=process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || 
    "mongodb+srv://Sujan77300:Sujan77300@cluster0.d1fkkjx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
