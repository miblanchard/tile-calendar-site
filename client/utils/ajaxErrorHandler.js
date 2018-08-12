module.exports = (error) => {
  if (error.constructor.name === 'Cancel') return;
  if (error.response) {
    // server responded with error
    const {
      data,
      status,
      headers
    } = error.response;

    console.error('Response Data --', data);
    console.error('Response Status --', status);
    console.error('Response Headers --', headers);
  } else if (error.request) {
    // server didn't respond
    console.error('Request failed to get a response --', error.request);
  } else {
    // error setting up request
    console.error('Error', error.message);
  }
  console.error(error);
};
