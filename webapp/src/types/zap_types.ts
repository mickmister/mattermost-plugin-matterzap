export type ZapInputField = {
    id: string;
    name: string;
    property_path: string[];
}

export enum ZapFieldComparison {
    INCLUDES_ANY = 'includes_any',
    INCLUDES_ALL = 'includes_all',
    EXCLUDES_ALL = 'excludes_all',
    EMPTY = 'empty',
}

export const ZAP_FIELD_COMPARISON_OPTIONS = [
    {
        label: 'Includes Any',
        value: ZapFieldComparison.INCLUDES_ANY,
    },
    {
        label: 'Includes All',
        value: ZapFieldComparison.INCLUDES_ALL,
    },
    {
        label: 'Excludes All',
        value: ZapFieldComparison.EXCLUDES_ALL,
    },
    {
        label: 'Empty',
        value: ZapFieldComparison.EMPTY,
    },
] as const;

export type FieldComparisonValue = string[];

export type ZapCondition = {
    id: string;
    field: string;
    comparison: ZapFieldComparison;
    value: FieldComparisonValue;
}

export type ZapConditionBranch = {
    type: 'or' | 'and';
    conditions: ZapCondition[];
}

export type ZapTestPayload = {
    id: string;
    name: string;
    value: string;
}

export type ZapAction = {
    type: 'create_post';
    template: string;
    channel_ids: string[];
    user_id: string;
    override_icon_path: string;
    override_username: string;
}

export type Zap = {
    id: string;
    name: string;
    inputFields: ZapInputField[];
    conditions: ZapCondition[];
    actions: ZapAction[];
    test_payloads: ZapTestPayload[];
}

export type ZapGroup = {
    id: string;
    name: string;
    zaps: Zap[];

    // test_payloads: ZapTestPayload[];
    webhook_url: string;
    authentication?: {
        type: AuthenticationType;
        oauth?: {
            client_id: string;
            client_url: string;
            refresh: boolean;
        };
        basic?: {
            username: string;
            password: string;
        };
        client_credentials?: {
            token: string;
        };
        query_token?: {
            param_name: string;
            param_value: string;
        };
        header_token?: {
            header_name: string;
            header_value: string;
        };
    }
}

export enum AuthenticationType {
    oauth = 'oauth',
    basic = 'basic',
    client_credentials = 'client_credentials',
    query_token = 'query_token',
    header_token = 'header_token',
}
