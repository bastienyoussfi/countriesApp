import express from 'express';
import { routes as countriesRoutes } from './countries/routes.js';

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));

app.use('/countries', countriesRoutes);

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.get('/sum/:a-:b', (req, res) => {
    res.send(`${parseInt(req.params.a) + parseInt(req.params.b)}`);
});

export function start() {
    app.listen(8080, () => {
        console.log('Listening at http://localhost');
    });
}
