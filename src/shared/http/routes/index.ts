import { Router } from 'express';
import moviesRouter from '../../../modules/movies/routes/movies.routes';
import sessionsRouter from '../../../modules/users/routes/sessions.routes';
import usersRouter from '../../../modules/users/routes/users.routes';

const routes = Router();

routes.use('/movies', moviesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
