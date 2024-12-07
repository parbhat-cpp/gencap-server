import express from "express";
import { generateCaptions } from "../controller/ai.controller";

const router = express.Router();

/**
 * Generate captions
 */
router.post("/generate-captions", generateCaptions);

export default router;
