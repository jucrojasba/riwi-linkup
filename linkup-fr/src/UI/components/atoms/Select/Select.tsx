import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectProps {
    label?: string;
    values: string[];
    onChange?: (e: SelectChangeEvent) => void;
    value: string;
    name: string;
}

export default function SelectOptions({ label, values, onChange, value, name }: ISelectProps) {
    return (
        <FormControl sx={{ width: '100%' }} size="small">
            <InputLabel id="select-options">{label}</InputLabel>
            <Select
                labelId="select-options"
                id="select-option"
                value={value}
                label={label}
                onChange={onChange}
                name={name}
            >
                <MenuItem value="">
                    <em>None</em> 
                </MenuItem>
                {values.map((val, index) => (
                    <MenuItem key={index} value={val}>
                        {val}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
