const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const BarangType = new GraphQLObjectType({
  name: "Barang",
  fields: () => ({
    rfid: { type: GraphQLString },
    harga: { type: GraphQLFloat },
    jumlah: { type: GraphQLInt },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    qrcode: { type: GraphQLString },
    barang: {
      type: new GraphQLList(BarangType),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = TransactionType;
