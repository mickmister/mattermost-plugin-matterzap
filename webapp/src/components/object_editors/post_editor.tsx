import React, {useCallback, useEffect} from 'react';

const initialSourceData = JSON.stringify({
    thing: 'yes',
});

const initialTemplate = `Yeah {{data.thing}}`;

const renderTemplate = (content) => {
    return (
        <p style={{
            height: '200px',
            border: '1px solid',
            display: 'block',
        }}>
            {content}
        </p>
    );
};

export default function PostEditor() {
    const [template, setTemplate] = React.useState(initialTemplate);
    const [sourceData, setSourceData] = React.useState(initialSourceData);
    const [output, setOutput] = React.useState('');

    const runTemplate = useCallback(async () => {
        const params = {
            template,
            data: sourceData,
        };

        const query = new URLSearchParams(params).toString();
        const url = `/plugins/matterzap/run-template?${query}`
        const res = await fetch(url).then(r => r.text());
        setOutput(res);
    }, [template, sourceData]);

    useEffect(() => {
        runTemplate();
    }, []);

    return (
        <div>
            <div>
                <button onClick={runTemplate}>Render</button>
            </div>
            {renderTemplate(output)}
            <div>
                <textarea
                    value={template}
                    onChange={React.useCallback((e) => {
                        setTemplate(e.target.value);
                    }, [setTemplate])}
                    style={style.textarea}
                />
                <textarea
                    value={sourceData}
                    onChange={React.useCallback((e) => {
                        setSourceData(e.target.value);
                    }, [setSourceData])}
                    style={style.textarea}
                />
            </div>
        </div>
    );
}

const style = {
    textarea: {
        fontSize: '12px',
        height: '300px',
        width: '500px',
    },
}
