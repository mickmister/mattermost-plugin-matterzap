import React from 'react';

import {ZAP_FIELD_COMPARISON_OPTIONS, ZapCondition, ZapFieldComparison, ZapInputField} from 'types/zap_types';

type Props = {
    onChange: (condition: ZapCondition) => void;
    value: ZapCondition;
    fields: ZapInputField[];
}

export default function ZapConditionEditor(props: Props) {
    const handleFieldSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const field = e.target.value as string;
        props.onChange({
            ...props.value,
            field,
        });
    };

    const handleComparisonChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const comparison = e.target.value as ZapFieldComparison;
        props.onChange({
            ...props.value,
            comparison,
        });
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as string;
        props.onChange({
            ...props.value,
            value: [value],
        });
    };

    const fieldSelect = (
        <select
            onChange={handleFieldSelect}
            value={props.value.field}
        >
            {props.fields.map((field) => (
                <option
                    key={field.id}
                    value={field.id}
                >
                    {field.name}
                </option>
            ))}
        </select>
    );

    const comparisonSelect = (
        <select
            onChange={handleComparisonChoice}
            value={props.value.comparison}
        >
            {ZAP_FIELD_COMPARISON_OPTIONS.map((comparison) => (
                <option
                    key={comparison.value}
                    value={comparison.value}
                >
                    {comparison.label}
                </option>
            ))}
        </select>
    );

    const valueInput = (
        <input
            onChange={handleValueChange}
            value={props.value.value}
        />
    );

    return (
        <div className='zap-condition-editor'>
            {fieldSelect}
            {comparisonSelect}
            {valueInput}
        </div>
    );
}
