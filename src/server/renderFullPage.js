module.exports = (reactDOM, initialData, css) => `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <style id="jss-server-side">${css}</style>
      <script src="bundle.js" defer></script>
      <script>window.__INITIAL_DATA__ = ${initialData}</script>
      <title>NYC Comedy Calendar</title>
    </head>
    <body>
      <div id="root">${reactDOM}</div>
    </body>
  </html>
`;
