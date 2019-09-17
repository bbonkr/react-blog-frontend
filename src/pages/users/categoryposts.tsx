import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import DefaultLayout from '../../components/DefaultLayout';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import ListExcerpt from '../../components/ListExcerpt';
import { PageHeader, Divider, Spin } from 'antd';
import UserAvatar from '../../components/UserAvatar';
import LinkUsersPosts from '../../components/LinkUsersPosts';
import { actionTypes } from '../../reducers/actionTypes';
import { IUserModel } from '../../typings/IUserModel';
import { ICategoryModel } from '../../typings/ICategoryModel';
import { IRootState, IUserCategoryPostsState } from '../../typings/reduxStates';

export interface IUserCategoryPostsProps {
    user: string;
    category: string;
}

const UserCategoryPosts: FunctionComponent<IUserCategoryPostsProps> = ({
    user,
    category,
}) => {
    const dispatch = useDispatch();
    const {
        userCategoryPosts,
        userCategoryPostsHasMore,
        userCategoryPostsLoading,
        postsLimit,
        userCategoryPostsCategory,
        userCategoryPostsUser,
        currentPage,
    } = useSelector<IRootState, IUserCategoryPostsState>(
        (s) => s.userCategoryPosts,
    );

    const onClickLoadMore = useCallback(() => {
        // const pageToken =
        //     userCategoryPosts &&
        //     userCategoryPosts.length > 0 &&
        //     userCategoryPosts[userCategoryPosts.length - 1].id;

        dispatch({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_CALL,
            data: {
                user: user,
                category: category,
                page: (currentPage || 0) + 1,
                limit: postsLimit,
                keyword: '',
            },
        });
    }, [category, dispatch, postsLimit, user, currentPage]);

    return (
        <DefaultLayout>
            <ContentWrapper>
                <Spin spinning={userCategoryPostsLoading}>
                    <PageHeader
                        title={
                            <div>
                                <span>CATEGORY: </span>
                                <LinkUsersPosts user={userCategoryPostsUser}>
                                    <UserAvatar user={userCategoryPostsUser} />
                                </LinkUsersPosts>
                                <span>
                                    {!!userCategoryPostsCategory &&
                                        userCategoryPostsCategory.name}
                                </span>
                            </div>
                        }
                    />
                    <Divider />
                    <ListExcerpt
                        posts={userCategoryPosts}
                        hasMore={userCategoryPostsHasMore}
                        loading={userCategoryPostsLoading}
                        loadMoreHandler={onClickLoadMore}
                    />
                </Spin>
            </ContentWrapper>
        </DefaultLayout>
    );
};

UserCategoryPosts.getInitialProps = async (context) => {
    const state = context.store.getState();
    const { user, category } = context.query;
    const {
        userCategoryPosts,
        postsLimit,
        currentUserCategory,
    }: IUserCategoryPostsState = state.userCategoryPosts;

    if (
        context.isServer ||
        !userCategoryPosts ||
        userCategoryPosts.length === 0 ||
        `${user}${category}` !== currentUserCategory
    ) {
        // 서버 요청 || 사용자 글 목록이 없음 || 현재 사용자와 요청 사용자가 다름
        context.store.dispatch({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_CALL,
            data: {
                user: user,
                category: category,
                // pageToken: null,
                // page: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return { user, category };
};

export default UserCategoryPosts;
