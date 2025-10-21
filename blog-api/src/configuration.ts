export default () => ({
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-api',
  },
  port: parseInt(process.env.PORT || '5000', 10),
});
