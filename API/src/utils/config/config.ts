export default{
    jwtScret: process.env.JWT_SCRET || 'screttoken',
    DB:{
        URI:  'mongodb+srv://lschacon1988:Luis1988@cluster0.qqekufj.mongodb.net/',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD

    }
}