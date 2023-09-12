import { readJSONSync } from 'fs-extra';
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
