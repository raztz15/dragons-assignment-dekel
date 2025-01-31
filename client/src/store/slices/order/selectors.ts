import { RootState } from '@src/store';


const orderDataSelector = (state: RootState) => state.orders;

export { orderDataSelector };
