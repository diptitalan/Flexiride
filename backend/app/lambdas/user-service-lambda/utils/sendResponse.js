const sendResponse = ({
    statusCode = 200,
    success = true,
    message = success ? 'Success' : 'Error',
    data = null,
    error = null,
    headers = {}
  } = {}) => {
    const body = {
      success,
      message,
    };
  
    if (success && data !== null) {
      body.data = data;
    }
  
    if (!success && error) {
      body.error = error.message || error;
    }
  
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...headers
      },
      body: JSON.stringify(body)
    };
  };
  
  module.exports = sendResponse;