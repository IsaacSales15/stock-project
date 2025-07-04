import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import routes from '../routes/index';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
