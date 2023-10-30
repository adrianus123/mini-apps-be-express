const {
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
} = require("graphql");
const TransactionType = require("./typeDef");
const Transaction = require("../../model/Transaction");
const redisClient = require("../../redis");
const { default: axios } = require("axios");
const moment = require("moment-timezone");

const BarangInputType = new GraphQLInputObjectType({
  name: "BarangInput",
  fields: () => ({
    rfid: { type: GraphQLString },
    harga: { type: GraphQLFloat },
    jumlah: { type: GraphQLInt },
  }),
});

const transferDataTransaction = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/transaksi/add",
      data
    );

    if (response.error) {
      console.error(response.error.message);
      return;
    }

    console.log("Success");
  } catch (error) {
    console.error(error);
  }
};

const createTransaction = {
  type: TransactionType,
  args: {
    qrcode: { type: GraphQLString },
    barang: { type: new GraphQLList(BarangInputType) },
  },

  resolve: async (parent, args, context, info) => {
    const transaction = await Transaction.create(args);

    for (const data of transaction.barang) {
      const transactionDate = moment(transaction.createdAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DDTHH:mm:ss");

      const transactionItem = {
        qrcode: transaction.qrcode,
        rfid: data.rfid,
        harga: data.harga,
        jumlah: data.jumlah,
        tanggal: transactionDate,
      };

      transferDataTransaction(transactionItem);
    }

    redisClient.del("transactions");
    redisClient.del(`cart:${args.qrcode}:items`);

    return transaction;
  },
};

module.exports = {
  createTransaction,
};
