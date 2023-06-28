import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../db/entities/users.entity';

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            login: { type: 'string' },
            email: { type: 'string' },
          },
        }
      },
    }
  },
};

type GetUserRequest = FastifyRequest<{
  Params: { login: string };
}>;

const getUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
            login: { type: 'string' },
            email: { type: 'string' },
        },
      },
    }
  },
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/users', getUsersOpts, async function(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.orm.manager.find(User);
    return reply.send(users);
  });

  fastify.get('/users/:login', getUserOpts, async function(request: GetUserRequest, reply: FastifyReply) {
    const user = await this.orm.manager.findOneBy(User, {login: request.params.login});
    if (user == null) {
      return reply.notFound('User is not defined');
    }
    return reply.send(user);
  });
};

export default fp(routes);