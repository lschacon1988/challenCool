import './database';
import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routers/user.routes";

import authRoutes from "./routers/auth.routes";
import passport from "passport";
import passportMiddleware from "./utils/middlewares/passport";
import destinosRoutes from "./routers/destinos.routes";


const app = express();

app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get('/',  (req, res, next) => {
    res.send(`The API is at http://localhost:${app.get('port')}`);
});

app.use('/api', authRoutes)
app.use('/api', userRouter); 

app.use('/api', destinosRoutes);


export default app;
