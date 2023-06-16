import { ExtractJwt, Strategy, StrategyOptions  } from "passport-jwt";
import config from "../config/config";
import UsersManager, { IUserManager } from "../manager/Users.manger";

const usersManager: IUserManager = new UsersManager();

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtScret
};

export default new Strategy(options, async (payload, done) => {

    try {
        console.log(payload);
        const user = await usersManager.getById(payload.id);
        
        if (user) {
            return done(null, user);
        }
        return done(null, { error: "User not found"});
    } catch (error) {
        
        return done(error, false);
    }
}
);



