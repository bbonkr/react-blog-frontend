import { ISearchPostsState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';

export const initialState: ISearchPostsState = {
    searchPosts: [],
    searchPostsPageToken: '',
    searchPostsLoading: false,
    searchPostsErrorReason: '',
    searchPostsHasMore: false,
    searchPostsKeyword: '',
    postsLimit: 10, // todo 상수로 변경
};

const reducer = (
    state: ISearchPostsState = initialState,
    action: IBlogAction,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.LOAD_SEARCH_POSTS_CALL:
                draft.searchPostsLoading = true;
                draft.searchPostsErrorReason = '';
                draft.searchPosts = action.data.pageToken
                    ? draft.searchPosts
                    : [];
                draft.searchPostsHasMore = action.data.pageToken
                    ? draft.searchPostsHasMore
                    : true;
                break;
            case actionTypes.LOAD_SEARCH_POSTS_DONE:
                draft.searchPostsLoading = false;
                action.data.records.forEach((v) => {
                    const index = draft.searchPosts.findIndex(
                        (x) => x.id === v.id,
                    );
                    if (index < 0) {
                        draft.searchPosts.push(v);
                        draft.searchPostsPageToken = `${v.id}`;
                    }
                });
                draft.searchPostsHasMore =
                    action.data.records.length === draft.postsLimit;
                draft.searchPostsKeyword = action.data.keyword;
                break;
            case actionTypes.LOAD_SEARCH_POSTS_FAIL:
                draft.searchPostsLoading = false;
                draft.searchPostsErrorReason = action.message;
                break;
            default:
                break;
        }
    });

export default reducer;
