/**
 * This Lambda will work as a resolver for quoteApi Graphql Query 
 * In this resolver the lambda is making an axios request to third party api 
 */

const { resolvers } = require("./resolvers");
/**
 * 
 * Event doc: https://aws.amazon.com/blogs/mobile/appsync-direct-lambda/
 * @param {Object} event - AppSync Lambda Resolver Input Format
 * @returns {Object}
 */
exports.handler = async (event) => {
  console.log("event : ", JSON.stringify(event));
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
