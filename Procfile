postdeploy: node dist/db/MigrateDb.js
web: NODE_ENV=production HOST=0.0.0.0 DATABASE_URL=$SCALINGO_POSTGRESQL_URL node dist/index.js