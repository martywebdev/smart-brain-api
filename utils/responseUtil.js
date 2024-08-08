const createResponse = (statusCode, message, data = null) => {
    return {
      statusCode,
      message,
      data,
    };
  };
  
  module.exports = {
    createResponse,
  };