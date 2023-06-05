import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { TokenRoute } from './routes/token.route';
import { UserCollectionRoute } from './routes/collection.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new TokenRoute(), new UserCollectionRoute()]);

app.listen();
