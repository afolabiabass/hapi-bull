'use strict'

const Joi = require('joi');

export default Joi.object({
    prefix: Joi.string().default('queues'),
    redis: Joi.object().keys({
        port: Joi.string().default('6379'),
        host: Joi.string().default('127.0.0.1'),
        password: Joi.string()
    }),
    queues: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        concurrency: Joi.number().default(1),
        processor: Joi.function().required(),
    })),
}).strict();