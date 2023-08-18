import React, {useCallback, useEffect} from 'react';

import {Zap, ZapCondition} from 'types/zap_types';

import PostOutputPreview from './post_output_preview';
import PostTemplateEditor from './post_template_editor';
import TestDataEditor from './test_data_editor';
import ZapConditionEditor from './condition_editor';

type Props = {
    value: Zap;
    onChange: (zap: Zap) => void;
};

export default function ZapEditor(props: Props) {
    const [output, setOutput] = React.useState('');
    const zapData = props.value;
    const setZapData = props.onChange;

    const template = zapData.actions[0]!.template;
    const testPayload = zapData.test_payloads[0].value;

    const setTemplate = ((t: string) => {
        setZapData({
            ...zapData,
            actions: [{
                ...zapData.actions[0],
                template: t,
            }],
        });
    });

    const setTestPayload = ((payload: string) => {
        setZapData({
            ...zapData,
            test_payloads: [
                {
                    ...zapData.test_payloads[0],
                    value: payload,
                },
            ],
        });
    });

    const setCondition = ((condition: ZapCondition) => {
        setZapData({
            ...zapData,
            conditions: [condition],
        });
    });

    const runTemplate = useCallback(async () => {
        const params = {
            template,
            data: testPayload,
        };

        const query = new URLSearchParams(params).toString();
        const url = `/plugins/matterzap/run-template?${query}`;
        const res = await fetch(url).then((r) => r.text());
        setOutput(res);
    }, [template, testPayload]);

    useEffect(() => {
        runTemplate();
    }, [runTemplate]);

    return (
        <div className='matterzap-editor'>
            <PostOutputPreview
                onRender={runTemplate}
                text={output}
            />
            <div>
                <ZapConditionEditor
                    fields={zapData.inputFields}
                    value={zapData.conditions[0]!}
                    onChange={setCondition}
                />
                <PostTemplateEditor
                    onChange={setTemplate}
                    value={template}
                />
                <TestDataEditor
                    onChange={setTestPayload}
                    value={testPayload}
                />
            </div>
        </div>
    );
}
