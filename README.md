# hapi-bull
This is a [Hapi](https://hapi.dev/) Plugin to handle queues using [Bull](https://github.com/OptimalBits/bull) connection and setup.

## Install
```
npm install --save @afolabiabass/hapi-bull
```
## Requirements
* Bull
```
npm install --save bull
```

## Usage
```javascript
const server = new Hapi.Server();

await server.register({
  plugin: require('hapi-bull'),
  options: {
    prefix: 'default',
    redis: {
      host: 'localhost',
      port: '6379',
      password: null,
    },
    queues: [
      {
        name: 'sample',
        concurrency: 1,
        processor: (server, job) => {
          console.log(`Starting queue for job ${job.id} with data ${job.data}`);

          return new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
    ],
  },
});

const queue = server.plugins['hapi-bull'].job;

const bull = server.plugins['hapi-bull'].lib;
```

## Options
* prefix - name attached to redis key
* redis - [Redis](https://redis.io/)
* queues - Various queues are defined as different process on the redis default connection. [Read More](https://github.com/OptimalBits/bull#separate-processes)

### Contribution
PR's are more than welcome!

<a href="https://github.com/InitAfricaHQ/vue-form-generator-element/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=InitAfricaHQ/vue-form-generator-element" />
</a>

## License
Hapi Bull is open source software licensed as
[MIT](https://github.com/afolabiabass/hapi-bull/blob/main/LICENSE).