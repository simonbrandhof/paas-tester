import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', {}, async function(request: FastifyRequest, reply: FastifyReply) {
    return reply.send('hello');
  });
};

export default fp(routes);