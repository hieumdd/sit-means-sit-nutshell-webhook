import express from 'express';
import { http } from '@google-cloud/functions-framework';

import { logger } from './logging.service';
import { handleLeadChanges } from './nutshell/nutshell.service';

const app = express();

app.use(({ headers, path, body }, _, next) => {
    logger.info({ headers, path, body });
    next();
});

app.use('/', ({ body }, res) => {
    handleLeadChanges(body)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => {
            logger.error({ error });
            res.status(500).json({ error });
        });
});

http('main', app);
