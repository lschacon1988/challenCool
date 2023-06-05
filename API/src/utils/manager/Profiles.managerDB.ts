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
         const user = await User.findById(idUser);

         if (!user) {
            throw new Error("User not found");
         }

         const newProfile = new Profile(profile);
         await newProfile.save();

         user.profile = newProfile._id;
         user.isProvider = true;
         user.save();

         return newProfile;
      } catch (error) {
         throw error;
      }
   };

   updateProfile = async (idPofile: string, profile: IProfile) => {
      try {
         const profileDB = await Profile.findOneAndUpdate(
            { _id: idPofile },
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
