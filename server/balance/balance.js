const express = require("express");
const bodyParser = require('body-parser');
const balance = express.Router();
const jsonParser = bodyParser.json();


const API_KEY = "RUI9W8DDT36U9R6UT3FHZFBHDRQQBEIAX3"

balance.post("/api/balance", jsonParser, async (req, res,) => {
    const { wallet } = req.body;
    try{
        fetch(`https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${wallet}&tag=latest&apikey=${API_KEY}`)
        .then((response ) =>{ return response.json()})
        .then((data) => {
            if(data.status == "0"){
                res.status(400).json({ type: "balance", result: "error", payload: data.result })
            }
            else{
                res.status(200).json({wallet: wallet, balance: data.result, type: "balance", result: "success"});
            }
        })
        .catch((error) => {
            res.json({ type: "balance", result: "error", payload: error })
        })
    }
    catch(err){}
})

module.exports = balance;