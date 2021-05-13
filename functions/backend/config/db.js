import mongoose from 'mongoose';

const connectDB = async () => {

    console.log("connevted?")
    try {
        //database Name
        const databaseName='Store';
        const con = await mongoose.connect(`mongodb+srv://admin:F7PPcTHJigsobFGT@cluster0.lasnf.mongodb.net/Store?authSource=admin&replicaSet=atlas-vaq5td-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }

}

export default connectDB