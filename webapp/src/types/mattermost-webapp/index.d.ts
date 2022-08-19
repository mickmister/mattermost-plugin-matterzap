import React from 'react';

export interface PluginRegistry {
    registerIntegrationType(name: string, description: string, route: string, icon: string, component: React.ElementType);
}
