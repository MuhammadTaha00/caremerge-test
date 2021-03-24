module.exports = (titles) => {
  return `
        <html>
          <head></head>
          <body>
            <h1> Following are the titles of given websites: </h1>
            <ul>
            ${titles.map((t) => `<li>${t}</li>`)}      
            </ul>
          </body>
        </html>
      `;
};
