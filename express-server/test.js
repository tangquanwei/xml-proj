import express from 'express';

const app = express();

app.use(express.static('../react-view/build'));

app.listen(5000);
