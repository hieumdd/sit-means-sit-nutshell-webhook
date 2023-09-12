import express from 'express';
import { http } from '@google-cloud/functions-framework';

import { logger } from './logging.service';
import { WebhookBodySchema } from './nutshell/nutshell.request.dto';
import { handleLeadChanges } from './nutshell/nutshell.service';

const app = express();

app.use(({ headers, path, body }, _, next) => {
    logger.info({ headers, path, body });
    next();
});

app.use('/', ({ body }, res) => {
    const { error } = WebhookBodySchema.validate(body);

    if (error) {
        res.status(200).json({ ok: true });
        return;
    }
    
    handleLeadChanges(body)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => {
            logger.error({ error });
            res.status(500).json({ error });
        });
});

http('main', app);
