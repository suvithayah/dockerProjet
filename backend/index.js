const express = require('express')
const app = express()
const { Client } = require('pg')
const client = new Client()


app.get('/', (req, res) => {
  res.redirect("/messages")
})

app.get('/messages', (req, res) => {
    client
    .query('SELECT * FROM messages')
    .then(sqlRes => res.json(sqlRes.rows))
    .catch(e => res.status(400).send(e.message))
});


client.connect().then(() => {
    app.listen(process.env.PORT | 3000, () => {
      console.log(`App listening at http://localhost:${process.env.PORT | 3000}`)
    })
}).catch(err => console.log(err))