/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const  express = require('express') ;
const path = require('path');
// eslint-disable-next-line no-undef
const {createProxyMiddleware} = require('http-proxy-middleware')  ;

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'http://dartsApp:8080',
  changeOrigin: true
}));

app.use((req, res, next) => {
  console.log(req.url)
  console.log(req.method)
  next();
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(9090, () => console.log("server is running on port 9090"));