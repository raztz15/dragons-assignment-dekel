import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { RootState } from '@src/store';
import { useSelector } from 'react-redux';

interface ISortFilterProps {
    sortBy: string
    onSortChange: (sortBy: string) => void;
}

export const SortFilter = ({ sortBy, onSortChange }: ISortFilterProps) => {

    const { direction } = useSelector((state: RootState) => state.directions);

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target
        onSortChange(value)
    }

    return (
        <Box display='flex' flexDirection='column' gap={2} dir={direction}>
            <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e)}
                    label='Sort by'>
                    <MenuItem dir={direction} value='_id'>Order Id</MenuItem>
                    <MenuItem dir={direction} value='orderTime'>Order Time</MenuItem>
                    <MenuItem dir={direction} value='customerName'>Customer Name</MenuItem>
                    <MenuItem dir={direction} value='totalPrice'>Total Price</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
