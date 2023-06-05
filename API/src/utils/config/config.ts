import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.PASSWORD_DB)

export default{
    jwtScret: process.env.JWT_SCRET || 'screttoken',
    DB:{
        URI:  `mongodb+srv://lschacon1988:${process.env.PASSWORD_DB}@cluster0.qqekufj.mongodb.net/`,
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD

    }
}