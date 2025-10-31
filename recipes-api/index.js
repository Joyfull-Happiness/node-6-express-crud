// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers
import fs from "fs/promises"; //the file system module lets us read and write data from files

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json());

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`);
}); //this method is turning on our server

// we will create the begennings of a CRUD application
//CRUD stands for Create, Read, Update, Delete
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()
async function getAllRecipes() {
  // We want to read data from the books-data.json file
  // The fs.readFile() method takes in 2 parameters:
  //   1. The file path to the file we want to read from
  //   2. The encoding
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedrecipes = JSON.parse(data);
  return parsedrecipes;
}

// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  // We want to read data from the books-data.json file
  // The fs.readFile() method takes in 2 parameters:
  //   1. The file path to the file we want to read from
  //   2. The encoding
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedrecipes = JSON.parse(data);
  return parsedrecipes[index];
}

// 3. getAllRecipeNames()
async function getAllRecipeNames() {
  // We want to read data from the books-data.json file
  // The fs.readFile() method takes in 2 parameters:
  //   1. The file path to the file we want to read from
  //   2. The encoding
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedrecipes = JSON.parse(data);
  return parsedrecipes.map((recipe) => recipe.name);
}

// 4. getRecipesCount()
async function getAllRecipesCount() {
  // We want to read data from the books-data.json file
  // The fs.readFile() method takes in 2 parameters:
  //   1. The file path to the file we want to read from
  //   2. The encoding

  const data = await fs.readFile("./recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes.length;
}
// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  // call the helper function and save its return value in a variable
  const recipes = await getAllRecipes();
  // res.send() sends text data in the response
  // res.json() sends JSON data in the response
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
//app.get = we are setting up and endpoint that recieves a get request
//app.get takes in two parameters: the url path sending (linking) the get request to a specific url (end point), once we send the get request to that url then you will call the async(req,res) => function
//the async function takes in two parameters (request and reponse )
app.get("/get-one-recipe/:index", async (req, res) => {
  // you are getting the value of the index dynamic parameter
  const index = req.params.index;

  // call the helper function that gets the recipe from the file (wait until the getOneRecipe function is done being called )
  const recipe = await getOneRecipe(index);

  // send the recipe as JSON data in the response
  res.json(recipe);
});

// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {
  //for the 2 lines of code below:  ask what is the data type that the response is requesting (look at the API documentation to see what data type the response is suppose to be)
  // below the variable calls on the helper function that gets the book's title at the specified index
  const recipeNames = await getAllRecipeNames();

  //the data type that the response is sending is and array
  // what is the data type that the helper function is returning
  res.json(recipeNames);
});

// 4. GET /get-recipes-count

app.get("/get-all-recipes-count", async (req, res) => {
  // call the helper function and save its return value in a variable
  const recipeCount = await getAllRecipesCount();
  // res.send() sends text data in the response
  // res.json() sends JSON data in the response
  res.json(recipeCount);
});
