const { GraphQLString, GraphQLFloat, GraphQLInt } = require("graphql");
const CartType = require("./typeDef");
const redisClient = require("../../redis");

const addToCart = {
  type: CartType,
  args: {
    qrcode: { type: GraphQLString },
    rfid: { type: GraphQLString },
    nama: { type: GraphQLString },
    harga: { type: GraphQLFloat },
    jumlah: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    const redisKey = `cart:${args.qrcode}:items`;
    const cart = await redisClient.get(redisKey);
    let cartArray = [];
    let isExist = false;

    if (cart) {
      cartArray.push(...JSON.parse(cart));
      cartArray.forEach((arr) => {
        if (arr.rfid === args.rfid) {
          arr.jumlah += args.jumlah;
          isExist = true;
        }
      });
    }

    if (!isExist) {
      cartArray.push(args);
    }
    await redisClient.set(redisKey, JSON.stringify(cartArray));
    return args;
  },
};

const deleteCartItem = {
  type: CartType,
  args: {
    qrcode: { type: GraphQLString },
    rfid: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const cart = [];
    const redisKey = `cart:${args.qrcode}:items`;
    const cache = await redisClient.get(redisKey);

    cart.push(...JSON.parse(cache));

    await redisClient.set(
      redisKey,
      JSON.stringify(cart.filter((ct) => ct.rfid != args.rfid))
    );

    return args;
  },
};

const deleteCart = {
  type: CartType,
  args: {
    qrcode: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const redisKey = `cart:${args.qrcode}:items`;
    await redisClient.del(redisKey);

    return args;
  },
};

module.exports = {
  addToCart,
  deleteCartItem,
  deleteCart,
};
