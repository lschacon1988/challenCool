import mongoose from "mongoose";
import config from "./utils/config/config"; 


mongoose.connect(config.DB.URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Database is connected');
});