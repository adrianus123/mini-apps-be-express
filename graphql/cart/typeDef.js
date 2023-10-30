const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = require("graphql");

const CartType = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    qrcode: { type: GraphQLString },
    rfid: { type: GraphQLString },
    nama: { type: GraphQLString },
    harga: { type: GraphQLFloat },
    jumlah: { type: GraphQLInt },
  }),
});

module.exports = CartType;
