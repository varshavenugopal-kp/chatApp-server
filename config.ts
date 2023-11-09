import mongoose,{ConnectOptions} from "mongoose";
const ConnectionOptions:  ConnectOptions|any={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
export const connectToDatabase = async (): Promise<void> => {
   
      mongoose.connect("mongodb://127.0.0.1:27017/Chat-App", ConnectionOptions).then(res=>{
        console.log('Connected to MongoDB');
      }).catch(error=> {
        console.error('Error connecting to MongoDB:', error);
    })
  };
  
  export default connectToDatabase;