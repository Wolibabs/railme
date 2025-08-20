const express =require('express');
const mongoose = require("mongoose");
const app = express();

const port =3000;

app.use(express.json());
const connectDb = async ()=> {
    try {
        await mongoose.connect("mongodb://localhost:27017/mydatabaserailme2");
        console.log("Database connect successfully");
    }catch (error) {
        console.error("Database connection failed:", error);
    
    }


}; 

const userSchema = new mongoose.Schema({
    name: String,
    destination: String,
    age: Number,
    nameOfNextOfKin: String,
    phoneNumberOfNextKin: Number
    
},{
    timestamps: true,
    versionkey: false
});

const User = mongoose.model("User", userSchema);

app.get('/', (req, res)=>{
    res.send('Hello World1');
});

app.post('/login',async (req, res) =>{
    const {name, destination, age, phoneNumberOfNextKin, nameOfNextOfKin,} = req.body;
  if(!name || !destination || !age || !phoneNumberOfNextKin||!nameOfNextOfKin ){
    return res.status(400).json({message: "All field are require"})
  }  
try{
const newUser =new User({
    name,
    destination,
    age,
    nameOfNextOfKin,
    phoneNumberOfNextKin
    
    


})
await newUser.save();
return res.status(201).json({message: "Booking status booked successfully"}) 
}catch (error){
    console.error(error);
    return res.status(500).json({message: 'Failed to retrieve booking'})  
}
});

app.get('/users', async (req, res)=>{
    try{
        const users= await User.find();
        return res.status(200).json(users);
    }catch (error){
        console.error(error);
        return res.status(500).json({message: 'Failed to retrieve booking'});
    }

});


app.get('/total', async (req, res)=>{
    try{
        const users= await User.find();
        return res.status(200).json(users.length);
    }catch (error){
        console.error(error);
        return res.status(500).json({message: 'Failed to retrieve booking'});
    }

});






app.listen(port,()=>{
    connectDb();
    console.log('server is running on port ${port}');
});
