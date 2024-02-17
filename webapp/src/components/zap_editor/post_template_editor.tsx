import React from 'react';

type Props = {
    onChange: (text: string) => void;
    value: string;
}

export default function PostTemplateEditor(props: Props) {
    return (
        <div className='zap-box'>
            <p>{'Template'}</p>
            <textarea
                className='zap-template-textbox'
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            />
        </div>
    );
}
