This is a basic NestJS project that I use to evaluate Platform as a Service (PaaS) providers.

My expectations for a PaaS are:
- european datacenter, with good PUE (<1.3?) and fully powered by renewable energy
- support NodeJS applications
- blue/green deployments, with state-of-the-art support of database migrations
- horizontal and vertical scalability 
- managed Postgres (automatic backups, cpu/memory/iops metrics, ...)
- minimal observability: log management, HTTP metrics, alerting
- (extra) auto-scalability
- (extra) automatic deployments from linked GitHub repository
- (extra) Redis