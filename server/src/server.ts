import app from "./app";
import { environment } from './config/environment/dev';

app.listen(environment.port, () => {
  console.log('Server listening on port ' + environment.port);
});
