import Profile, { IProfile } from "../../models/Profile";
import User from "../../models/User";



interface IProfileManager {
   getAllProfiles(): Promise<IProfile[]>;
   getProfileById(idUser: string): Promise<IProfile>;
   createProfile(idUser: string, profile: IProfile): Promise<IProfile>;
   updateProfile(idUser: string, profile: IProfile): Promise<IProfile>;
}
export default class ProfilesManager {
   getAllProfiles = async (): Promise<IProfile[]> => {
      try {
         const profiles = await Profile.find().populate("user", [
            "username",
            "isProvider",
         ]);
         return profiles;
      } catch (error) {
         console.error(error);
         throw error;
      }
   };

   getProfileById = async (idUser: string) => {
      try {
         const profile = await Profile.findOne({ user: idUser })
            .populate("user", { username: 1, isProvider: 1 })
            .exec();

         if (!profile) throw new Error("Profile not found");

         return profile;
      } catch (error) {
         throw error;
      }
   };

   createProfile = async (idUser: string, profile: IProfile) => {
      try {
         const user = await User.findById(idUser).populate("profile").exec();

         if (!user) {
            throw new Error("User not found");
         }

         const newProfile = new Profile(profile);
         newProfile.user = user._id;
         await newProfile.save();
         

         user.profile = newProfile._id;
         user.isProvider = true;
         await user.save();

         return await User.findById(idUser).populate("profile").exec();
      } catch (error) {
         throw error;
      }
   };

   updateProfile = async (idUser: string, profile: IProfile) => {
      try {
         const profileDB = await Profile.findOneAndUpdate(
            { user: idUser },
            profile,
            { new: true }
         );

         if (!profileDB) throw new Error("Profile not found");

         return profileDB;
      } catch (error) {
         throw error;
      }
   };

   deleteProfile = async (idProfile: string) => {
      try {
         const profile = await Profile.findOneAndRemove({ _id: idProfile });

         if (!profile) throw new Error("Profile not found");

         return { msg: "Profile deleted" };
      } catch (error) {
         console.error(error);
         throw error;
      }
   };
}
