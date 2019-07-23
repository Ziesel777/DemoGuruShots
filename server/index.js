
const express = require('express');
const app = express();
const path = require('path');

const userRouter = require('./routes/usersRouter');

const port = process.env.PORT || 3000;

//-------------- Что бы CORS не ругался -------------
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain);

app.use(express.json());

app.use(express.static(path.join(__dirname,'..','dist')));

app.get('/', (req, res) => {
    // res.send('Hello World! Server is run');
})

app.use('/api/users',userRouter);


//------------------- RUN SERVER -------------------------
app.use((req,res,next)=>{
    res.sendFile('/index.html');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})



