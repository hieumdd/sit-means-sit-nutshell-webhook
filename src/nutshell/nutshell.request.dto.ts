export type WebhookRequest = {
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
