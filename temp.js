// Define variables
const five = require('johnny-five');
const board = new five.Board();
const axios = require("axios");
let thermometer;
var date = new Date();


board.on('ready', function () {
    var temperature = new five.Thermometer({
        controller: "Analog", 
        pin: "A0", //Plug signal cable into this pin
        freq: 10000 //Change this figure to increase,decrease frequency of value being checked
    });

    temperature.on("change", function () {
            axios.post('https://aqueous-eyrie-47464.herokuapp.com/addData', { //axios sends data to be pushed to heroku
                time: new Date().toLocaleTimeString(), //Time reading in mongodb Atlas database
                date: new Date().toLocaleDateString(), //Date reading in mongodb Atlas database
                temperature: this.celsius / 10 + " C", //Temperature reading in mongodb Atlas database
                temperature: this.fahrenheit + " F" // Attempted to add fahrenheit, but gives out an inaccurate result
            })
            console.log(this.celsius / 10 + " C", this.fahrenheit + " F") //Console log on terminal
        });
    });
