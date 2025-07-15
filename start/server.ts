import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import { errorHandlerMiddleware } from '../app/middlewares/error_handler';
import routes from '../routes/web';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, '..', 'resources', 'views'));

app.use(express.static(path.resolve(__dirname, '..', 'public')))

routes(app);

// if no port is found, error 404 is returned (não me esquecer dessa budega)
app.use((req, res) => {
  res.status(404).render('error', {
    status: 404,
    message: 'Página não encontrada',
  });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
