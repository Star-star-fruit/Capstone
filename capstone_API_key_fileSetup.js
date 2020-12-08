const fs = require('fs')
fs.writeFile(
  process.env.CAPSTONE_API_KEY_FILE,
  process.env.CAPSTONE_API_KEY,
  err => {
    console.error(err)
  }
)
