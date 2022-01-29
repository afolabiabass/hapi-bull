'use strict'

const Queue = require('bull')
const validation = require('./validation');

const register = async (server, pluginOptions) => {
    const { value: options, error } = await validation.validate(pluginOptions);

    if (error) {
        throw error;
    }

    const queue = new Queue(options.prefix, {
        redis: {
          port: options.redis.port,
          host: options.redis.host,
          password: options.redis.password
        }
    }, {
        removeOnFail: true,
        removeOnComplete: true,
    });

    options.queues.forEach((singleQueue) => {
        queue.process(singleQueue.name, singleQueue.concurrency, (job) => singleQueue.processor(server, job))
    })

    queue.on('error', (...errs) => console.log(new Date(), 'Queue error:', ...errs.reverse()));
    queue.on('stalled', job => console.log(new Date(), 'Queue stalled', job.id));

    const expose = {
        lib: Queue,
        job: queue,
    };

    server.decorate('server', 'queue', expose);
    server.decorate('request', 'queue', expose);
}

exports.plugin = {
    register,
    pkg: require('../package.json')
};