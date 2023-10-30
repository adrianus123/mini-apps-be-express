const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/X-mart";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Koneksi ke database berhasil.");
  })
  .catch((error) => {
    console.error(`Gagal terhubung ke database: ${error}`);
  });

module.exports = mongoose;
