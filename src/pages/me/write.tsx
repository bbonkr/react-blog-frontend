import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, PageHeader } from 'antd';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import MeLayout from '../../components/MeLayout';
import { withAuth } from '../../utils/auth';
// import { markdownConverter } from '../../helpers/converter';
import WritePostForm from '../../components/WritePostForm';
import { actionTypes } from '../../reducers/actionTypes';
import { NextPageContext } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { IRootState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';
import { IPageProps } from '../../typings/IPageProps';

const PLACEHOLDER_MARKDOWN = 'Write your thought!';

export interface IWriteProps extends IPageProps {
    id?: number;
}

const Write: FunctionComponent<IWriteProps> = ({ id }) => {
    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title='Write' />
                <Divider />
                <WritePostForm key={`post-${id}`} id={id} />
            </ContentWrapper>
        </MeLayout>
    );
};

Write.getInitialProps = async (
    context: NextPageContext & NextJSContext<IRootState, IBlogAction>,
): Promise<IWriteProps> => {
    const id = parseInt((context.query.id as string) || '0', 10);

    // console.log('/me/write ==> id: ', id);

    if (id) {
        context.store.dispatch({
            type: actionTypes.LOAD_MY_POST_CALL,
            data: { id },
        });
    } else {
        context.store.dispatch({
            type: actionTypes.WRITE_NEW_POST_CALL,
        });
    }

    context.store.dispatch({
        type: actionTypes.LOAD_MY_CATEGORIES_CALL,
        data: {
            page: 1,
            limit: 0,
            keyword: '',
        },
    });

    context.store.dispatch({
        type: actionTypes.LOAD_MY_TAGS_CALL,
    });

    return { id };
};

export default withAuth(Write);
