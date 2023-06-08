This is a basic NestJS project that I use to evaluate Platform as a Service (PaaS) providers.

My expectations for a PaaS are:
- european datacenter, with good PUE (<1.3?) and fully powered by renewable energy
- support NodeJS applications
- blue/green deployments, with state-of-the-art support of database migrations
- horizontal and vertical scalability 
- managed Postgres (automatic backups, cpu/memory/iops metrics, ...)
- minimal observability: log management, HTTP metrics, alerting
- scheduled tasks
- (extra) auto-scalability
- (extra) automatic deployments from linked GitHub repository
- (extra) Redis

## Scalingo notes

- set the env variable `NPM_CONFIG_PRODUCTION=false` in order to install npm dev dependencies (required for the NestJS CLI used to build).
- Scalingo uses the npm scripts `build` and `start` ([doc](https://doc.scalingo.com/languages/nodejs/start))
- the port is provided by the env variable `PORT`