module.exports = (reactDOM, reduxState, css) => `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <title>NYC Comedy Calendar</title>
    </head>
    <body>
      <div id="root">${reactDOM}</div>
      <style id="jss-server-side">${css}</style>
      <script>
        window.REDUX_DATA = ${JSON.stringify(reduxState)};
      </script>
      <script src="bundle.js"></script>
    </body>
  </html>
`;
