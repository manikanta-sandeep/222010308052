const express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3003;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.get('/', (req, res)=>{
    const {first} = req.body;
    res.send(`Welcome ${first}`);
});

app.get('/train/trains', async (req,res) =>{
    try {
        const url = 'http://20.244.56.144/train/trains'; 
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1Njc4ODUsImNvbXBhbnlOYW1lIjoiTXkgVHJhaW4iLCJjbGllbnRJRCI6ImJiNGZjYTM4LTRiMzItNDgwNy05MjYwLWQ2ZGM3MjI2NWNlMyIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMjIwMTAzMDgwNTIifQ.XMWtpx4RCp6xUuiVlm56s29W7oR3Mp3jewrayiK3Dxc';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
      
        const response = await axios.get(url, config);
        console.log(response.data);
        var data = response.data;
        data.sort((a,b)=> (a.price.sleeper - b.price.sleeper || a.price.AC - b.price.AC || b.seatsAvailable.sleeper - a.seatsAvailable.sleeper || b.seatsAvailable.AC - a.seatsAvailable.AC || (b.departureTime.Hours*60+(b.departureTime.Minutes+b.delayedBy)*60+b.departureTime.seconds) - (a.departureTime.Hours*60+(a.departureTime.Minutes+a.delayedBy)*60+a.departureTime.seconds) ));
        res.json(data);
        
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})


app.get('/create_token', async (req,res) =>{
    try {
        const url = 'http://20.244.56.144/train/trains'; 
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1NjcxMjgsImNvbXBhbnlOYW1lIjoiTXkgVHJhaW4iLCJjbGllbnRJRCI6ImJiNGZjYTM4LTRiMzItNDgwNy05MjYwLWQ2ZGM3MjI2NWNlMyIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMjIwMTAzMDgwNTIifQ.k7HyXueJczGeh3jq5JkNjy0cFtIItUWVNkF7w5pkX4M';
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            body : {
            companyName: "My Train",
            clientID: "bb4fca38-4b32-4807-9260-d6dc72265ce3",
            ownerName: "Sandeep",
            ownerEmail: "bpuppala@gitam.in",
            rollNo: "222010308052",
            clientSecret: "CEmEUmEtNTDVBbvM"
        }
        };
        const response = await axios.post(url, body, config);
        console.log(response.data);
        var data = response.data;
        res.json(data);
        
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})





app.get('/train/trains/:num', async (req,res) =>{
    try {
        const url = 'http://20.244.56.144/train/trains'; 
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1Njg1NTMsImNvbXBhbnlOYW1lIjoiTXkgVHJhaW4iLCJjbGllbnRJRCI6ImJiNGZjYTM4LTRiMzItNDgwNy05MjYwLWQ2ZGM3MjI2NWNlMyIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMjIwMTAzMDgwNTIifQ.clyHc7K60MZBilnfTYdoNoEJIfY0BsUh8NqgzuuGs7Y';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
      
        const response = await axios.get(url, config);
        console.log(response.data);
        var data = response.data;
        
        const filterData = data.filter(obj => obj.trainNumber == req.params.num);

        res.json(filterData);
        
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})


app.get('/home', (req, res)=>{
    res.status(200);
    res.send('<h1>Welcome to the home</h1>');
});


app.listen(PORT, (error) => {
    if(!error)
        console.log('Server is Successful');
    else
        console.log('Error');
});