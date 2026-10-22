import express from 'express';
import * as services from '../services-$id/service.js';
import {AppError} from '../middlewares-$id/error-handler.js';
import {apiResponse as defaultResponse} from '../mappers-$id/api-response.js';

const router = express.Router();


export default router;
