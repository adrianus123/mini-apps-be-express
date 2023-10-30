const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    qrcode: { type: String, required: true },
    barang: [
      {
        rfid: { type: String, required: true },
        harga: { type: Number, required: true },
        jumlah: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
