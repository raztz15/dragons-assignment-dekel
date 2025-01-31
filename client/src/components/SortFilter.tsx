import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react'

interface ISortFilterProps {
    onSortChange: (sortBy: string) => void;
}

export const SortFilter = ({ onSortChange }: ISortFilterProps) => {
    const [sortBy, setSortBy] = useState('_id');

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target
        setSortBy(value)
        onSortChange(value)
    }

    return (
        <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
                value={sortBy}
                onChange={(e) => handleSortChange(e)}
                label='Sort by'>
                <MenuItem value='_id'>Order Id</MenuItem>
                <MenuItem value='time'>Order Time</MenuItem>
                <MenuItem value='status'>Status</MenuItem>
                <MenuItem value='totalPrice'>Total Price</MenuItem>
            </Select>
        </FormControl>
    )
}
