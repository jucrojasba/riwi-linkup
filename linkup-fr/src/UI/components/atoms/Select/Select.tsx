import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface ISelectProps {
  label?: string;
  values: string[],
  onchange: (e: SelectChangeEvent) => void,
  value:string,
  name: string
}
export default function SelectOptions({label,values,onchange,value, name}: ISelectProps) {
  return (
    <FormControl sx={{ width: '100%'}} size="small">
      <InputLabel id="select-options">{label}</InputLabel>
      <Select
        labelId="select-options"
        id="select-option"
        value={value}
        label={label}
        onChange={onchange}
        name={name}
      >
        <MenuItem value={value}>
          <em>{value}</em>
        </MenuItem>
        {values.map((value, index) => <MenuItem key={index} value={value}>{value}</MenuItem>)}
      </Select>
    </FormControl>
  );
}