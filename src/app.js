//import installed npm modules to use
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
require("./db/connection")
//Import modules from coffee.js
// const {listOrder, addOrder, collectCoffee} = require ("../utils/coffees");
const { Order } = require("./db/models/Order");
const { connection } = require("mongoose");

// Set first question to be asked
const firstQuestion = [
    {type: "list", 
    name: "options", 
    message: "what would you like order", 
    choices: ["cappuccino", "mocha", "latte"]}
];

//Set second question to be asked
const secondQuestion = [
    {type: "list", 
    name: "options", 
    message: "what size would you like?", 
    choices: ["small", "medium", "large"]}
];

//Set third question to be asked 
const thirdQuestion = [
    {type: "list", 
    name: "options", 
    message: "what would you like to do?", 
    choices: ["view orders", "order again", "collect", "leave"]}
];

const collectQuestionType = [
    {type: "input",  
    name:"options",
    message: "which type of coffee would you like to collect?"}
];

const collectQuestionSize = [
    {type: "input",  
    name:"options",
    message: "what size?"}
];

//Make the figlet text show up before anything else runs
const main = () => {
    console.log(chalk.greenBright(figlet.textSync("Hello there!")));
    app()
};

//app function to be run
const app = async () => {
    //make app wait for the response to the first question
    const answers = await inquirer.prompt(firstQuestion);
    //depending on the answer, console log the choice made
    if(answers.options == "cappuccino" || "mocha" || "latte"){
        console.log(`You picked a ${answers.options}`);
        //await answer to second question
        const answer = await inquirer.prompt(secondQuestion)
        //depending on the answer, console log the choice made
        console.log(`You picked a ${answer.options} ${answers.options} `)
        //run the addOrder function, passing in the answers to the 2 questions asked.
        // addOrder(answers.options, answer.options) <-- USED BEFORE MONGO INTEGRATION
        const order = new Order({
            coffee: answers.options,
            size: answer.options,
        });
        await order.save();
        //await the answer to the third question
        const response = await inquirer.prompt(thirdQuestion);
        //if order again is selected, rerun the app function
        if(response.options == "order again"){
            app();
            //if view orders is selected, list the orders
        }else if(response.options == "view orders"){
            console.log("Here are your orders")
            // listOrder() <-- USED BEFORE MONGO INTEGRATION
            const showOrders = await Order.find({});
            console.log(showOrders);
            connection.close();
        }else if(response.options == "collect"){
            const answer = await inquirer.prompt(collectQuestionType)
            const answers = await inquirer.prompt(collectQuestionSize)
            await Order.deleteOne({coffee:`${answer.options}`, size:`${answers.options}`});
            const showOrders = await Order.find({});
            console.log(showOrders);
            // if leave option is chosen, say bye and end the application
        }else if(response.options == "leave"){
            console.log("Bye!")
            connection.close();
        };

    };
};
//run the main function, which shows the figlet text and then runs the app function
main();