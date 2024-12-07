process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "5000";

export default {
    NODE_ENV: process.env.NODE_ENV as string,

    PORT: parseInt(process.env.PORT, 10),
    
    GROQ_API_KEY: process.env.GROQ_API_KEY as string,
    R2_ENDPOINT: process.env.R2_ENDPOINT as string,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME as string,
}
