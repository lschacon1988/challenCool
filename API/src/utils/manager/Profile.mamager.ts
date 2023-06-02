import Profile, { IProfile} from '../../models/Profile'
import User from '../../models/User'

export default class ProfileManager {

    getAllProfiles = async () => {
        try {
            const profiles = await Profile.find().populate('user', ['username', 'isProvider']);
            return profiles;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getProfileById = async (idUser: string) => {
        try {
            const profile = await Profile.findOne({ user: idUser }).populate('user', ['username', 'isProvider']);
            return profile;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    createProfile = async (idUser: string, profile: IProfile) => {

        try{
            const user = await User.findById(idUser);
            if(!user){
                throw new Error('User not found');
            }
            const newProfile = new Profile(profile);
            newProfile.user = user._id;
            await newProfile.save();
            user.isProvider = true;
            return newProfile;
        }catch(error){
            console.error(error);
            throw error;
        }}

}