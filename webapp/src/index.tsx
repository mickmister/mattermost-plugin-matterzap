import React from 'react';
import {Store, Action} from 'redux';

import {GlobalState} from '@mattermost/types/lib/store';

import MatterzapBackstage from 'components/matterzap_backstage';

import manifest from './manifest';

import './styles.scss';

window.matterzapReload = window.matterzapReload || false;

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from './types/plugin_registry';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        const enableTeamSidebar = true;

        const GlobalHeaderRight = () => {
            return null;
        };

        const GlobalHeaderCenter = () => {
            return null;
        };

        const Backstage = () => (
            <MatterzapBackstage/>
        );

        registry.registerProduct(
            '/matterzap',
            'product-playbooks',
            'Matterzap',
            '/matterzap',
            Backstage,
            GlobalHeaderCenter,
            GlobalHeaderRight,
            enableTeamSidebar,
            null,
        );

        if (!window.matterzapReload) {
            window.matterzapReload = true;
        } else {
            location.replace('/matterzap');
        }
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(manifest.id, new Plugin());
