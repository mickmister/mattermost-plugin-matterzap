import React from 'react';
import PostEditor from './object_editors/post_editor';

type Props = {

};

export default function ZapEditor(props: Props) {
    const [selectedObjectType, selectObjectType] = React.useState('post');

    const objectTypeSelector = (
        <select
            value={selectedObjectType}
            onSelect={React.useCallback((e) => {
                selectObjectType(e.target.value);
            }, [selectObjectType])}
        >
            <option value='post'>
                {'Post'}
            </option>
        </select>
    )

    let objectForm = <PostEditor/>;
    switch (selectedObjectType) {
    case 'post':
        objectForm = <PostEditor/>;
        break;
    }

    return (
        <div>
            {/* {objectTypeSelector} */}
            {objectForm}
        </div>
    )
}
