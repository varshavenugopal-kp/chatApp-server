import mongoose,{ConnectOptions} from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const ConnectionOptions:  ConnectOptions|any={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
export const connectToDatabase = async (): Promise<void> => {
   
      mongoose.connect(process.env.MONGO_CONNECTION as string, ConnectionOptions).then(res=>{
        console.log('Connected to MongoDB');
      }).catch(error=> {
        console.error('Error connecting to MongoDB:', error);
    })
  };
  
  export default connectToDatabase;