import React from 'react';

import RenderedMarkdown from './markdown_preview';

type Props = {
    onRender: () => void;
    text: string;
}

export default function PostOutputPreview(props: Props) {
    const output = (
        <pre className='matterzap-post-body-preview'>
            {props.text}
        </pre>
    );

    return (
        <div className='zap-box'>
            <div>
                <button onClick={props.onRender}>{'Render'}</button>
            </div>
            <div>
                {output}
            </div>
            <div className='zap-box'>
                <RenderedMarkdown value={props.text}/>
            </div>
        </div>
    );
}
