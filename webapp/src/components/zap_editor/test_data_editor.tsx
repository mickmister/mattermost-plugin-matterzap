import React from 'react';

type Props = {
    onChange: (text: string) => void;
    value: string;
}

export default function TestDataEditor(props: Props) {
    return (
        <div className='zap-box'>
            <p>{'Test Data'}</p>
            <textarea
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            />
        </div>
    );
}
