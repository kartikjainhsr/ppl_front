import { createStore , combineReducers} from 'redux';
import register_reducer from './register_reducer';
import login_reducer from './login_reducer';
import upload_post_reducer from './upload_post_reducer';
import upload_category_reducer from './upload_category_reducer';

const rootReducer = combineReducers({
    register : register_reducer,
    login : login_reducer,
    upload_post : upload_post_reducer,
    upload_category : upload_category_reducer
});

const store = createStore(rootReducer);

export default store;