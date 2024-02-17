import React from 'react';

export interface PluginRegistry {
    registerProduct(
        route: string,
        icon: string,
        name: string,
        route2: string,
        backstage: React.ElementType,
        headerCenter: React.ElementType,
        headerRight: React.ElementType,
        enableTeamSidebar: boolean,
        lastParam: null,
    )
}
