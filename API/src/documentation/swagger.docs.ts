import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition = {
   openapi: "3.0.0",
   info: {
      version: "1.0.0",
      title: "My API",
      description: "This is a sample API",
   },
   servers: [
      {
         url: "http://localhost:3000",
      },
   ],
   tags: [
      {
         name: "Users",
         description: "Operations about users",
      },
      {
         name: "Profile",
         description: "Operations about profile",
      },
      {
         name: "Destino",
         description: "Operations about destino",
      },
   ],
   components: {
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },
      schemas: {
         User: {
            type: "object",
            properties: {
               username: {
                  type: "string",
                  required: true,
                  description: "User's username",
               },

               password: {
                  type: "string",
                  required: true,
                  description: "User's password",
               },

               email: {
                  type: "string",
                  required: true,
                  description: "User's email",
               },
               isProvider: {
                  type: "boolean",
                  required: false,
                  description: "User's isProvider",
               },
               touristicDestinations:[{
                  type: "string",
                  required: false,
                  description: "User's touristicDestinations",
               }],
               profile:{
                  type: "string",
                  required: false,
                  description: "User's profile",
               },
               createdAt:{
                  type: "DateTime",
                  required: false,
                  description: "User's createdAt",
                  format: "date-time",
                  example: "2020-01-01T00:00:00.000Z",
                  readOnly: true

               },
               updatedAt:{
                  type: "DateTime",
                  required: false,
                  description: "User's updatedAt",
                  format: "date-time",
                  example: "2020-01-01T00:00:00.000Z",}

            },
         },
         Profile: {
            type: "object",
            properties: {
               name: {
                  type: "string",
                  required: true,
                  description: "Profile's name",
               },
               lastname: {
                  type: "string",
                  required: true,
                  description: "Profile's lastname",
               },
               profileImage: {
                  type: "string",
                  required: true,
                  description: "Profile's profileImage",
               },
               coutry: {
                  type: "string",
                  required: true,
                  description: "Profile's coutry",
               },
               city: {
                  type: "string",
                  required: true,
                  description: "Profile's city",
               },
               tlf: {
                  type: "string",
                  required: true,
                  description: "Profile's tlf",
               },
               createdAt:{
                  type: "DateTime",
                  required: false,
                  description: "Profile's createdAt",
                  format: "date-time",
                  example: "2020-01-01T00:00:00.000Z",
               },
               updatedAt:{
                  type: "DateTime",
                  required: false,
                  description: "Profile's updatedAt",
                  format: "date-time",
                  example: "2020-01-01T00:00:00.000Z",
               },

            },
         },
         Destino: {
            type: "object",
            properties: {
               name: {
                  type: "string",
                  required: true,
                  description: "Destino's name",
               },
               description: {
                  type: "string",
                  required: true,
                  description: "Destino's description",
               },
               price: {
                  type: "number",
                  required: true,
                  description: "Destino's price",
               },
               image: [
                  {
                     type: "string",
                     required: true,
                     description: "Destino's image",
                  },
               ],
               createdAt:{
                  type: "DateTime",
                  required: false,
                  description: "Destino's createdAt",
                  format: "date-time",
                  example: "2020-01-01T00:00:00.000Z",
               },
               updatedAt:{
                  type: "DateTime",
                  required: false,
                  description: "Destino's updatedAt",
                  format: "date-time",
                  example: "2020-01-01T00:00:00.000Z",
               },
            },
         },
      },
   },
};

const swaggerOptions = {
   definition: swaggerDefinition,
   apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);

