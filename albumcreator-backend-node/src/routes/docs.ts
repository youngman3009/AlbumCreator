import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs'; 

const swaggerDocument = yamljs.load('src/public/swagger.yaml'); 

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { router as docsRouter };
