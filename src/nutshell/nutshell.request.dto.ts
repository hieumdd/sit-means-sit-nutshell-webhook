import Joi from 'joi';

export type WebhookBody = {
    events: {
        id: string;
        type: 'events';
        createdTime: number;
        payloadType: string;
        action: string;
        changes: {
            attribute: string;
            oldValue: any;
            newValue: string;
        }[];
    }[];
    payloads: {
        id: string;
    }[];
};

export const WebhookBodySchema = Joi.object({
    events: Joi.any(),
    payloads: Joi.any(),
});
