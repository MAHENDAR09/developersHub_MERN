const express = require ('express');
const mongoose = require ('mongoose');
const devuser = require('./devusermodel');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const reviewmodel = require('./reviewmodel');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(express.json());
app.use(cors ({origin : '*'}));


mongoose.connect("mongodb+srv://mahendar:mahendar12@cluster0.ujf60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
()=> console.log("DB Connected....... ")
) 

// app.get ('/' , (req,res) => {
//     return res.send("Server Running......")
// })
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', '/components/App.jsx'));
});


app.post('/register',async (req,res)=> {
    try{
        const {fullname,email,mobile,skill,password,confirmpassword} = req.body;
        const exist = await devuser.findOne({email});
        if (exist) {
            return res.status(400).send("User Already Registered");
        }
        // if (password.trim().toString().equalsto(confirmpassword.trim().toString())) {
        //     return res.status(400).send("Password and Confirm Password are not match");
        // }
        let newUser = new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        // console.log(newUser.email);
        newUser.save();
        return res.status(200).send("User Registered Successfully");
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("Server Error")
    }
})


app.post('/login',async (req,res) => {
    try{
        const {email,password} = req.body;
        const exist = await devuser.findOne({email});
        if (!exist) {
            return res.status(400).send("user not exist");
        }
        if (exist.password != password) {
            return res.status(400).send("password Invalid");
        }

        let payload = {
            user : {
                id : exist.id
            }
        }
        const token = jwt.sign(payload,'jwtpassword',{expiresIn:300000000}, 
            (err,token) => {
                if (err) throw err
                return res.json({token})
            }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.get('/allprofiles',middleware, async (req,res) => {
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles);

    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user = await devuser.findById(req.user.id);
        return res.json(user);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post ('/addreview', middleware , async (req,res) => {
    try{
        const {taskworker,rating} = req.body;
        const exist = await devuser.findById(req.user.id);
        const newReview = new reviewmodel({
            taskprovider:exist.fullname,
            taskworker,rating
        })
        newReview.save();
        return res.status(200).send("Updated Successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error"); 
    }
})

app.get('/myreview',middleware,async (req,res) => {
    try{

        let allreviews = await reviewmodel.find();
        let myreview = allreviews.filter(review =>review.taskworker.toString() === req.user.id.toString() )
        return res.status(200).json(myreview);
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
})
app.listen (5000, ()=> console.log("Running........"));
