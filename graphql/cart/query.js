const { GraphQLList, GraphQLString } = require("graphql");
const CartType = require("./typeDef");
const redisClient = require("../../redis");

const getCart = {
  type: new GraphQLList(CartType),
  args: {
    qrcode: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const redisKey = `cart:${args.qrcode}:items`;
    const cart = await redisClient.get(redisKey);

    return JSON.parse(cart);
  },
};

module.exports = {
  getCart,
};
