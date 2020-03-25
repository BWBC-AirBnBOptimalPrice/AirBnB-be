const express=require("express")
const cors=require("cors")
const server=express()
const cookieParser=require('cookie-parser')
const user=require('./router/userAuth')

server.use(express.json())
server.use(cors())
server.use(cookieParser())
server.use('/auth',user)

server.use((err, req, res, next) => {
	res.status(500).json({ message: 'Server Error' });
});

module.exports=server