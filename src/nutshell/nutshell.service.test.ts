import { readJSONSync } from 'fs-extra';

import { WebhookBodySchema } from './nutshell.request.dto';
import { handleLeadChanges } from './nutshell.service';

describe('handleLeadChanges', () => {
    it('handleLeadChanges/success', async () => {
        const data = readJSONSync(`${__dirname}/sample-lead.json`);
        return handleLeadChanges(data).then((result) => expect(result).toBe(true));
    });
    it('handleLeadChanges/failure', async () => {
        const data = readJSONSync(`${__dirname}/sample-contact.json`);
        return handleLeadChanges(data).then((result) => expect(result).toBe(false));
    });
});

describe('validate', () => {
    it('validate/success', () => {
        const data = readJSONSync(`${__dirname}/sample-lead.json`);
        const { value, error } = WebhookBodySchema.validate(data, { allowUnknown: true });
        expect(value).toBeTruthy();
        expect(error).toBe(undefined);
    });
});
