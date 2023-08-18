import React, {useMemo} from 'react';

const PostUtils = window.PostUtils;

type Props = {
    value: string;
}

export default function RenderedMarkdown(props: Props) {
    const markdownView = useMemo(() => {
        const formattedText = PostUtils.formatText(props.value);
        return PostUtils.messageHtmlToComponent(formattedText);
    }, [props.value]);

    return (
        <div>
            {markdownView}
        </div>
    );
}
