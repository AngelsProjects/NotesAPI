/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import getExpressApp from '@middlewares/getExpressApp';
import notesRoutes from '@routes/notes.routes';
import { Express } from 'express';
import { Server } from 'http';

const app: Express = getExpressApp();
const port         = process.env.PORT || 3001;

// Execute all routes
notesRoutes(app);

const server: Server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// Here HMR story begins
declare const module: any;
// You need only 3 lines of code to start accepting code changes coming through the HMR
if (module.hot) {
  module.hot.accept();
  // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
  module.hot.dispose(() => server.close());
}
