import express from "express";
import multer from "multer";

import { deleteImage, uploadImage } from "../controller/image.controller";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

/**
 * Upload file
 */
router.post("/upload", upload.single('image'), uploadImage);

/**
 * Request to delete uploaded image
 */
router.post("/delete", deleteImage);

export default router;
