import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: { type: 'boolean' },
        },
      },
    },
  },
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/ping', opts, async function(request: FastifyRequest, reply: FastifyReply) {
    await this.orm.query('select 1');
    return reply.send({ pong: true });
  });
};

export default fp(routes);