const { NODE_ENV } = process.env;
const { DATABASE_URL } = process.env;

module.exports = {
  seed: async (prisma) => {
    console.log("Database connected successfully!");
  },
};
