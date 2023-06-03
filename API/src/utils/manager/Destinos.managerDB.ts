import Destino, {IDestino} from "../../models/Destino";
import User, { IUser } from "../../models/User";

export default class DestinosManagerDB {

    getAllDestino = async (): Promise<IDestino[]> => {
        return await Destino.find();
    }

    async getById(id: string): Promise<IDestino | Object> {
        
        const destino = await Destino.findById(id);
        if (!destino) {
            return { msg: "Destino not found" };
        }
        return destino;
    }

    async create(userId: string ,destino: IDestino): Promise<IDestino|object> {
        const userProvider: IUser | null = await User.findById(userId);
        console.log(!userProvider?.isProvider)
        if (!userProvider) {
            return {msg:"User not found"}}
        if(!userProvider.isProvider){
            return {msg:"User is not a provider completely you profile"};
        }
        const newDestino = await Destino.create(destino);
        userProvider.touristicDestinations.push(newDestino._id);
        await userProvider.save();

        return newDestino;
    }

    async update(userId: string, destino: IDestino): Promise<  IDestino | Object> {
        const userProvider: IUser | null = await User.findById(userId);
        if (!userProvider) {
            throw new Error("User not found");}
        if(!userProvider.isProvider){
            throw new Error("User is not a provider completely you profile");
        }
        const destinoUpdated = await Destino.findByIdAndUpdate(destino._id, destino, { new: true });
        if (!destinoUpdated) {
            return { msg: "Destino not found" };
        }
        return destinoUpdated;
    }

    async delete(userId: string, id: string): Promise<IDestino | Object> {
        const userProvider: IUser | null = await User.findById(userId);
        if (!userProvider) {
            throw new Error("User not found");}
        if(!userProvider.isProvider){
            throw new Error("User is not a provider completely you profile");
        }
        const destinoDeleted = await Destino.findByIdAndDelete(id);
        if (!destinoDeleted) {
            return { msg: "Destino not found" };
        }
        return destinoDeleted;
    }
}

    

