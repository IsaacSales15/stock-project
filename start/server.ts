import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import { errorHandlerMiddleware } from '../app/middlewares/error_handler';
import routes from '../routes/web';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'))

app.engine('handlebars', engine({
  helpers: {
      inc: (value: number) => value + 1,
      dec: (value: number) => Math.max(value - 1, 0),
    },
  }
));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, '..', 'resources', 'views'));

app.use(express.static(path.resolve(__dirname, '..', 'public')))

routes(app);

// if no port is found, error 404 is returned (não me esquecer dessa budega)
app.use((req, res) => {
  res.status(404).render('error/error_handle', {
    status: 404,
    message: 'Página não encontrada',
  });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
