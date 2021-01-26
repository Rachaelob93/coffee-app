// require the modules needed
const fs = require("fs");
const chalk = require("chalk");

//create addOrder function which takes 2 parameters, myOrder and mySize
const addOrder = (myOrder, mySize) => {
    //create a constant which runs the loadOrders function, returning the parsed data
    const allOrders = loadOrders()
    //push the data to an object
    allOrders.push({order: myOrder, mySize});
    //console log what has been added 
    console.log(`
    Added a new order: ${mySize} ${myOrder}
    `);
    //run the saveOrders function, passing in the parsed data that has been pushed, sending it to the coffee.json file.
   saveOrders(allOrders)
};
//create a function to load the orders
const loadOrders = () => {
    //create a try function to read the json file, convert it to a string and return it
    try{
        //read the json file
        const dataBuffer = fs.readFileSync("src/coffee.json");
        //convert the data to a string
        const coffeeJson = dataBuffer.toString();
        // return the data
        return JSON.parse(coffeeJson);
        //if there is an error, catch it here
    } catch (error) {
        //if there is an error, return this
        return [];
    }
};
//create a function to save orders, with one parameter of allOrders
const saveOrders = (allOrders) => {
    //create a constant to convert what is passed to the function to a string
    const coffeeJson = JSON.stringify(allOrders);
    //send the data specified to the path specified
    fs.writeFileSync("src/coffee.json", coffeeJson);
};

//create a function to list all orders
const listOrder = () => {
    //create a constant to run the loadOrders function, passing back the parsed data.
    const totalOrder = loadOrders();
    //create a new array with the order number and order 
    totalOrder.map((coffee, index) => {
        //console log the specified data from the new array.
        console.log(`${index + 1}. ${coffee.mySize} ${coffee.order}`);
    });
};


//export the modules for use in another file.
module.exports = {
    addOrder,
    loadOrders,
    listOrder
};