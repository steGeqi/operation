import Box from './Box/index'
import Decoration from './Decoration/index'

export default app => {
  app.use(Box);
  app.use(Decoration);
}