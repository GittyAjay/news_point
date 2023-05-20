import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../utils/http';

const initialState = {
    news_headline: null,
    page: 0,
    status: 'idle',
    isLoading: false,
    error: null,
};

export const fetchNewsHeadlineData = createAsyncThunk(
    'headlines/fetchNewsHeadlineData',
    async (arg, { getState, dispatch }) => {
        try {
            dispatch(newsHeadlineSlice.actions.incrementPage());
            let page = getState().headlines.page;
            console.log("===page in api call", page);
            const response = await http.get('top-headlines', { page });
            console.log("===api fetchNewsHeadlineData", response.data);
            return response.data?.articles;
        } catch (error) {
            throw new Error('Failed to fetch news headline');
        }
    }
);

export const newsHeadlineSlice = createSlice({
    name: 'headlines',
    initialState,
    reducers: {
        save: (state, action) => {
            console.log("===inside save reducer");
            state.news_headline = action.payload;
        },
        incrementPage: (state, action) => {
            console.log("===inside incrementPage reducer");
            state.page = state.page + 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsHeadlineData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchNewsHeadlineData.fulfilled, (state, action) => {
            state.isLoading = false
            state.news_headline = action.payload
        })
        builder.addCase(fetchNewsHeadlineData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
});

// Action creators are generated for each case reducer function
export const { save } = newsHeadlineSlice.actions;

export default newsHeadlineSlice.reducer;
