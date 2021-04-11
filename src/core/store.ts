import { createStore, applyMiddleware } from 'redux';
import reduxChunk from 'redux-thunk';
import reducers from '@/redux/rootReducer';

export const store = createStore(reducers, applyMiddleware(reduxChunk));
