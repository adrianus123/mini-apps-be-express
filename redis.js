const Redis = require("redis");
const redisClient = Redis.createClient();

(async () => {
  redisClient.on("error", (error) => console.error(`Error: ${error}`));
  await redisClient.connect();
  console.log("Koneksi ke redis berhasil.");
})();

module.exports = redisClient;
