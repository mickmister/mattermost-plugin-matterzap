import React from 'react';
import BackstageList from './backstage_list';
import ZapEditor from './zap_editor';

const TEAM_NAME = 'hey';

type Props = {

}

export default function MatterZapBackstage(props: Props) {
    const zapEditor = [
        <ZapEditor/>,
    ];

    return (
        <BackstageList
            header={'MatterZap'}
            addText={'Add new Zap'}
            addLink={'/' + TEAM_NAME + '/integrations/bots/add'}
            addButtonId='addBotAccount'
            emptyText={'No Zaps found'}
            emptyTextSearch={'No Zaps match'}
            helpText={
                'Create Zaps!'
            }
            searchPlaceholder={'Search Zaps'}
            loading={false}
        >
            {zapEditor}
        </BackstageList>
    );
}
