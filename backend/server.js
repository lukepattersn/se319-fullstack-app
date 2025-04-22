const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3001;

app.use(express.json());

// simple test route
app.get('/', (req, res) => {
  res.send('Express backend is up and running!');
});

// start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
