import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from 'antd';

const LinkWrapper = styled.span`
    margin-right: 1em;
`;

export interface ILinkTagProps {
    tag: any;   // todo type tag
}

const LinkTag: FunctionComponent<ILinkTagProps> = ({ tag }) => {
    const { name, slug } = tag;
    const encodedSlug = encodeURIComponent(slug);
    return (
        <LinkWrapper>
            <Link
                href={{ pathname: '/tag', query: { slug: encodedSlug } }}
                as={`/tag/${encodedSlug}`}>
                <a>
                    <Icon type="tag" /> <span>{name}</span>
                </a>
            </Link>
        </LinkWrapper>
    );
};

LinkTag.propTypes = {
    tag: PropTypes.object.isRequired,
};

export default LinkTag;
