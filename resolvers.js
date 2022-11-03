const { getOrders, addOrder } = require("./helperFunctions")

exports.resolvers = {
  Query: {
    listOrders: async () => await getOrders()
  },
  Mutation: {
    createOrder:async (ctx) => await addOrder(ctx.arguments.input)
  }
};
