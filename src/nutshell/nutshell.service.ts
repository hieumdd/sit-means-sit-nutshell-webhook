import { WebhookBody } from './nutshell.request.dto';
import { insert } from '../bigquery.service';

export const handleLeadChanges = async (dto: WebhookBody) => {
    const event = dto.events[0];
    const payload = dto.payloads[0];

    if (event?.payloadType !== 'leads' || event?.action !== 'update') {
        return false;
    }

    const row = {
        event: {
            id: event.id,
            type: event.type,
            createdTime: event.createdTime,
            payloadType: event.payloadType,
            action: event.action,
            changes: (event.changes || []).map((change) => ({
                attribute: change.attribute,
                oldValue: change.oldValue,
                newValue: change.newValue,
            })),
        },
        payload: {
            id: payload.id,
        },
    };

    return insert(
        {
            table: 'Webhook_Leads',
            schema: [
                {
                    name: 'event',
                    type: 'RECORD',
                    fields: [
                        { name: 'id', type: 'STRING' },
                        { name: 'type', type: 'STRING' },
                        { name: 'createdTime', type: 'TIMESTAMP' },
                        { name: 'payloadType', type: 'STRING' },
                        { name: 'action', type: 'STRING' },
                        {
                            name: 'changes',
                            type: 'RECORD',
                            mode: 'REPEATED',
                            fields: [
                                { name: 'attribute', type: 'STRING' },
                                { name: 'oldValue', type: 'STRING' },
                                { name: 'newValue', type: 'STRING' },
                            ],
                        },
                    ],
                },
                {
                    name: 'payload',
                    type: 'RECORD',
                    fields: [{ name: 'id', type: 'STRING' }],
                },
            ],
        },
        [row],
    ).then(() => true);
};
