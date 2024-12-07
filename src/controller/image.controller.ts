import { Request, Response } from "express";
import httpStatus from "http-status";
import path from "path";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

import { ApiResponse } from "../utils/ApiResponse";

export const uploadImage = async (req: Request, res: Response) => {
    const apiResponse = new ApiResponse();

    try {
        const image = req.file;

        if (!image) {
            apiResponse.error = 'Please upload an image';
            apiResponse.status_code = httpStatus.UNPROCESSABLE_ENTITY;

            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(apiResponse);
            return;
        }

        if (image.size >= 1500000) {
            apiResponse.error = 'Image size should be less than or equal to 1.5MB';
            apiResponse.status_code = httpStatus.UNPROCESSABLE_ENTITY;

            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(apiResponse);
            return;
        }

        const s3 = new S3Client({
            region: "auto",
            endpoint: process.env.R2_ENDPOINT!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });

        const objectKey = uuidv4().substring(0, 8) + path.extname(image.originalname);

        const response = await s3.send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: objectKey,
            Body: image.buffer,
            ContentType: image.mimetype,
        }));

        apiResponse.data = { key: objectKey, response };
        apiResponse.status_code = httpStatus.CREATED;

        res.status(httpStatus.CREATED).send(apiResponse);
    } catch (error) {
        apiResponse.error = error?.toString();
        apiResponse.status_code = httpStatus.INTERNAL_SERVER_ERROR;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
    }
}

export const deleteImage = async (req: Request, res: Response) => {
    const apiResponse = new ApiResponse();

    try {
        const objectKey = req.body['object-key'];

        if (!objectKey) {
            apiResponse.error = "Please provide an object key to delete image";
            apiResponse.status_code = httpStatus.UNPROCESSABLE_ENTITY;

            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(apiResponse);
            return;
        }

        const s3 = new S3Client({
            region: "auto",
            endpoint: process.env.R2_ENDPOINT!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });

        const response = await s3.send(new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: objectKey,
        }));

        apiResponse.data = response;
        apiResponse.status_code = httpStatus.OK;

        res.status(httpStatus.OK).send(apiResponse);
    } catch (error) {
        apiResponse.error = error?.toString();
        apiResponse.status_code = httpStatus.INTERNAL_SERVER_ERROR;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
    }
}
