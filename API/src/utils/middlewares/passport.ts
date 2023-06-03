import { ExtractJwt, Strategy, StrategyOptions  } from "passport-jwt";
import config from "../config/config";
import UsersManager from "../manager/Users.manger";

const usersManager: any = new UsersManager();

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtScret
};

export default new Strategy(options, async (payload, done) => {

    try {
        const user = await usersManager.getById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}
);



