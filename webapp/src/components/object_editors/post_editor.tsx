import React from 'react';

const initialSourceData = JSON.stringify({
    thing: 'yes',
});

const initialTemplate = `Yeah {{data.thing}}`;

const renderTemplate = (template, data) => {
    

    return (
        <p>
            {template}
        </p>
    );
};

export default function PostEditor() {
    const [template, setTemplate] = React.useState(initialTemplate);
    const [sourceData, setSourceData] = React.useState(initialSourceData);

    return (
        <div>
            {renderTemplate(template, sourceData)}
            <textarea
                value={sourceData}
                onChange={React.useCallback((e) => {
                    setSourceData(e.target.value);
                }, [setSourceData])}
                style={style.textarea}
            />
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
