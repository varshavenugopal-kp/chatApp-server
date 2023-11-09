const jwt=require('jsonwebtoken')
import { config } from 'dotenv'
config()
interface token{
    id:string
}
const generateToken=(id:token)=>{
    return jwt.sign({id},process.env.JWT_KEY,{
        expiresIn:'3d'
    })
}

module.exports=generateToken