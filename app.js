const express = require('express');
const PORT = process.env.PORT || 9090;
const app = express();

const Routes = require('./routes/Routes');


app.use(Routes);


app.listen(PORT, () => console.log(`listening on port ${PORT}`));