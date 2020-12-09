const fs = require('fs')

if (process.env.CAPSTONE_API_KEY_FILE && process.env.CAPSTONE_API_KEY) {
  fs.writeFileSync(
    process.env.CAPSTONE_API_KEY_FILE,
    process.env.CAPSTONE_API_KEY
  )
}
