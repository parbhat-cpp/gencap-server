import { Request, Response } from "express";
import httpStatus from 'http-status';
import Groq from "groq-sdk";

import { ApiResponse } from "../utils/ApiResponse";

export const generateCaptions = async (req: Request, res: Response) => {
    const apiResponse = new ApiResponse();

    try {
        const imageName = req.body['image-name'];
        const captionLength = req.body['caption-length'] || "short length";
        const userPrompt = req.body['user-prompt'];

        if (!imageName) {
            apiResponse.error = 'Please provide image url';
            apiResponse.status_code = httpStatus.BAD_REQUEST;

            res.status(httpStatus.BAD_REQUEST).send(apiResponse);
            return;
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": `Generate the best ${captionLength} caption for the provided image with proper emojis and hashtags. Return three captions in a valid javascript json format (e.g. {"caption1": "generated caption"} key and value both will be string) so that it is easier to parse in the client side. Using Llama API to produce captions so return only captions and no other text`
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": `${process.env.R2_ACCESS_URL}/${imageName}`
                            }
                        },
                        {
                            "type": "text",
                            "text": userPrompt,
                        }
                    ]
                }
            ],
            "model": "llama-3.2-11b-vision-preview",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        apiResponse.data = chatCompletion;
        apiResponse.status_code = httpStatus.OK;

        res.status(httpStatus.OK).send(apiResponse);
    } catch (error) {
        apiResponse.error = error?.toString();
        apiResponse.status_code = httpStatus.INTERNAL_SERVER_ERROR;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
    }
}
