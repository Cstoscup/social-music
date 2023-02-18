require('dotenv').config();
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(process.env.CLIENT_ID);
  console.log(`Example app listening on port ${port}`)
})