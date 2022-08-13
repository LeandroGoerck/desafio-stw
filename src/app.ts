import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import ingredientsRoutes from './routes/ingredientsRoutes';


class App {
  public app: express.Express;


  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-MEthods', 'GET,POST, DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());

    this.app.use('/ingredients', ingredientsRoutes);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT);
     console.log(`Servidor de receitas rodando na porta ${PORT}`);
  }
}

export { App };
