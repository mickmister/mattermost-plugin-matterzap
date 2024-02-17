import React, {useState} from 'react';

import {Zap, ZapFieldComparison, ZapGroup} from 'types/zap_types';

import ZapEditor from './zap_editor/zap_editor';

// eslint-disable-next-line quotes, quote-props
const initialSourceData = JSON.stringify({"issues": [{"key": "MM-22033", "status": "URGENT", "title": "The power went out, and we need power."}]});

const initialTemplate = 'New comment on [{{ (index .issues 0).key }}](https://somelink.com) (status: {{ (index .issues 0).status }})\n\n> {{ (index .issues 0).title }}';

const initialZapData: Zap = {
    id: 'my-zap-id',
    actions: [
        {
            type: 'create_post',
            channel_ids: [],
            override_icon_path: '',
            override_username: '',
            template: initialTemplate,
            user_id: '',
        },
    ],
    name: '',
    inputFields: [{
        id: 'field1',
        name: 'status',
        property_path: ['status', 'value'],
    }],
    conditions: [{
        id: 'condition1',
        value: ['URGENT'],
        comparison: ZapFieldComparison.INCLUDES_ANY,
        field: 'field1',
    }],
    test_payloads: [
        {
            id: 'payload1',
            name: 'Urgent Issue',
            value: initialSourceData,
        },
    ],
};

const initialZapGroup: ZapGroup = {
    id: 'group1',
    name: 'Jira',
    zaps: [initialZapData],
    webhook_url: 'https://mymattermost.com/plugins/matterzap/webhook/group1',
};

export default function MatterzapBackstage() {
    const [zapGroup, setZapGroup] = useState(initialZapGroup);
    const zap = zapGroup.zaps[0];

    const onZapChange = (z: Zap) => {
        setZapGroup({
            ...zapGroup,
            zaps: [z],
        });
    };

    const zapEditor = (
        <ZapEditor
            value={zap}
            onChange={onZapChange}
        />
    );

    return (
        <div
            className='matterzap-backstage'
        >

            {zapEditor}
        </div>
    );
}
