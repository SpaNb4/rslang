import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import bookReducer from './book/reducer';
import dictionaryReducer from './dictionary/reducer';
import appReducer from './app/reducer';
import kitReducer from './kit/reducer';
import { SLICE_NAME as app } from './app/action-types';
import { SLICE_NAME as dictionary } from './dictionary/action-types';
import { SLICE_NAME as book } from './book/action-types';
import { SLICE_NAME as kit } from './kit/action-types';

const store = configureStore({
	reducer: {
		[app]: appReducer,
		[book]: bookReducer,
		[dictionary]: dictionaryReducer,
		[kit]: kitReducer,
	},
	middleware: [thunkMiddleware],
});

export default store;
