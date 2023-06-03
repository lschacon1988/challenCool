import Profile, { IProfile} from '../../models/Profile'
import User from '../../models/User'

export default class ProfilesManager {

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
            const profile = await Profile.findOne({ user: idUser }).populate('user', {username:1, isProvider:1 }).exec();
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
            await newProfile.save();
            
            user.profile = newProfile._id;
            user.isProvider = true;
            user.save();

            return newProfile;
        }catch(error){
            console.error(error);
            throw error;
        }}

    updateProfile = async (idUser: string, profile: IProfile) => {
        try {
            const profileDB = await Profile.findOneAndUpdate({ user: idUser }, profile, { new: true });

            return profileDB;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    deleteProfile = async (idUser: string) => {
        try {
            const profile = await Profile.findOneAndRemove({ user: idUser });

            return profile;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}