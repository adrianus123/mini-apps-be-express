const { GraphQLList, GraphQLString } = require("graphql");
const TransactionType = require("./typeDef");
const Transaction = require("../../model/Transaction");
const redisClient = require("../../redis");

const getTransactions = {
  type: new GraphQLList(TransactionType),
  resolve: async (parent, args, context, info) => {
    const redisKey = "transactions";
    const cacheData = await redisClient.get(redisKey);

    if (cacheData) {
      console.log("Get data from Redis.");
      return JSON.parse(cacheData);
    } else {
      const transaction = await Transaction.find().sort({ createdAt: -1 });
      await redisClient.set(redisKey, JSON.stringify(transaction));

      console.log("Get data from API.");
      return transaction;
    }
  },
};

module.exports = {
  getTransactions,
};
