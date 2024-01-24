const express=require("express");
const router=express.Router();
const axios=require("axios");

const url='https://api.wazirx.com/api/v2/tickers'

router.get('/cryptoData',async (req, res)=>{
    try {

        const data=await fetchData();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
    }
})

const fetchData = async ()=>{
    try {
        const response=await axios.get(url);
        // console.log(response)
        return response.data;
    } catch (error) {

        console.error("error in fetching data", error);
    }
}

module.exports =router;