import Destino, { IDestino } from "../../models/Destino";
import User, { IUser } from "../../models/User";
import { ObjectId } from "mongoose";

export interface IDestinosManagerDB {
   getAllDestino(): Promise<IDestino[]>;
   getById(idDestino: string): Promise<IDestino | Object>;
   create(userId: string, destino: IDestino): Promise<IDestino | object>;
   update(userId: string, destino: IDestino): Promise<IDestino | Object>;
   delete(userId: string, id: string): Promise<IDestino | Object>;
}

export default class DestinosManagerDB {
   getAllDestino = async (): Promise<IDestino[]> => {
      return await Destino.find();
   };

   async getById(id: string): Promise<IDestino | Object> {
      try {
         const destino = await Destino.findById(id);
         if (!destino) {
            throw new Error(`Destino not found`);
         }
         return destino;
      } catch (error) {
         throw error;
      }
   }

   async create(userId: string, destino: IDestino): Promise<IDestino | object> {
      try {
         const userProvider: IUser | null = await User.findById(userId);

         if (!userProvider) {
            throw new Error("User not found");
         }
         if (!userProvider?.isProvider) {
            throw new Error("User is not a provider completely you profile");
         }
         const newDestino = new Destino(destino);
         newDestino.user = userProvider._id;
         await newDestino.save();
         userProvider.touristicDestinations.push(newDestino._id);
         await userProvider.save();

         return newDestino;
      } catch (error) {
         throw error;
      }
   }

   async update(userId: string, destino: IDestino): Promise<IDestino | Object> {
      try {
         const userProvider: IUser | null = await User.findById(userId);
         if (!userProvider) {
            throw new Error("User not found");
         }
         if (!userProvider.isProvider) {
            throw new Error("User is not a provider completely you profile");
         }
         const destinoUpdated = await Destino.findByIdAndUpdate(
            destino._id,
            destino,
            { new: true }
         );
         if (!destinoUpdated) {
            throw new Error("Dest not found");
         }
         return destinoUpdated;
      } catch (error) {
         throw error;
      }
   }

   async delete(userId: string, idDestino: string): Promise<IDestino | Object> {
      try {
         const userProvider: IUser | null = await User.findById(userId);
         if (!userProvider) {
            throw new Error("User not found");
         }
         if (!userProvider.isProvider) {
            throw new Error("User is not a provider completely you profile");
         }

         const idDestinoUser = idDestino as unknown as ObjectId;
         const index =
            userProvider.touristicDestinations.indexOf(idDestinoUser);
         userProvider.touristicDestinations.splice(index, 1);
         userProvider.save();

         const destinoDeleted = await Destino.findByIdAndDelete(idDestino);
         if (!destinoDeleted) {
            throw new Error("Dest not found");
         }
         return destinoDeleted;
      } catch (error) {
         throw error;
      }
   }
}
