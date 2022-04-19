import "dotenv/config";

const secret = process.env.SECRET;

export default {
  jwt: {
    secret: `${secret}`,
    expiresIn: "1d",
  },
};
