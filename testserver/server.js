const app = require('express')()
const port = 3333
app.get('/', (req, res) => {
  res.send({
    'result': ['9.3 - ETH', '21', '182724;51;0', '30502;30457;30297;30481;30479;30505', '0;0;0', 'off;off;off;off;off;off', '53;71;57;67;61;72;55;70;59;71;61;70', 'eth-eu1.nanopool.org:9999', '0;0;0;0']
  })
}).listen(port, () => { console.log('INFO > Server started on port ' + port) })
