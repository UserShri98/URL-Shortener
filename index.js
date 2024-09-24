const express=require("express");
const urlRoute=require('./routes/url')
const URL=require('./models/url')
const {connectMongoDb}=require("./connect")

const app=express();

const PORT=5000;


connectMongoDb("mongodb://localhost:27017/short-url")
.then(()=>console.log("Mongodb is connected"))

app.use(express.json())
app.use('/url',urlRoute)

app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate(
        {
          shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    }
)
res.redirect(entry.redirectURL)
})



app.listen(PORT,()=>{
    console.log(`Server is  listening on PORT ${PORT}`);
})