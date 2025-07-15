import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import routes from '../routes/web';
import methodOverride from 'method-override';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, '..', 'resources', 'views'));

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
