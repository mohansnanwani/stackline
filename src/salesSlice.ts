import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface SalesState {
  salesData: SalesData[];
  sortKey: string;
  sortDirection: 'asc' | 'desc';
}

const initialState: SalesState = {
  salesData: [],
  sortKey: 'weekEnding',
  sortDirection: 'asc',
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSalesData: (state, action: PayloadAction<SalesData[]>) => {
      state.salesData = action.payload;
    },
    sortSalesData: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const direction = state.sortDirection === 'asc' ? 'desc' : 'asc';

      state.sortDirection = direction;
      state.sortKey = key;

      state.salesData.sort((a, b) => {
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        } else if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        return 0;
      });
    },
  },
});

export const { setSalesData, sortSalesData } = salesSlice.actions;

export default salesSlice.reducer;
