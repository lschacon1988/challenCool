export default{
    jwtScret: process.env.JWT_SCRET || 'screttoken',
    DB:{
        URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-typescript',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD

    }
}