import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routers/user.routes";


const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send(`The API is at http://localhost:${app.get('port')}`);
});

app.use('/api', userRouter); 


export default app;
