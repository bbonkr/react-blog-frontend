import produce from 'immer';
import { actionTypes } from './actionTypes';
import { ISettingState } from '../typings/reduxStates';

export const initialState: ISettingState = {
    currentUrl: '', // 현재 URL 참조 eg.) /users/@test/posts/post-slug
    // baseUrl: 'http://localhost:5000', // 현재 URL 호스트 이름 eg.) https://localhost:5000
};

const reducer = (state: ISettingState = initialState, action) =>
    produce(state, (draft) => {
        // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);
        switch (action.type) {
            // case actionTypes.SET_BASE_URL:
            //     draft.baseUrl = action.data;
            //     break;
            case actionTypes.SET_CURRENT_URL:
                const { url } = action.data;
                draft.currentUrl = url;
                break;
            default:
                break;
        }
    });

export default reducer;
