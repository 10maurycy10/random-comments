const fs = require('fs')

fs.readFile('data/big2.json', 'utf8' , (err, json) => {
  if (err) {
    console.error(err)
    return
  }
  let data = JSON.parse(json).messages
  for (event of data) {
    if (event.type == "m.room.message") {
      if (event.content.msgtype == "m.text") {
        console.log(event.content.body)
      }
    }
  }
})

