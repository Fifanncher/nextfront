import React from 'react';
import s from './Card.module.scss';
import Button from '../Button';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";

@inject(`RouterStore`)
@observer
class Card extends React.Component {

    routeChange = (alias) => {
        const pathname = `/catalog/${alias}`;

        this.props.RouterStore.push({
                pathname: '/catalog/[category]',
                query: {
                    category: alias
                },
            },
            undefined,
            {shallow: true}
        );
    }

    render() {
        const {name, alias, img} = this.props;

        return (
            <div className={s.card}>
                <img src={img}/>
                <div className={s.name}>
                    <NextLink
                        href={{
                            pathname: '/catalog/[category]',
                            query: {category: alias}
                        }}
                        as={`/catalog/${alias}`}
                        passHref
                        shallow={true}
                    >
                        <Button
                            onClick={() => this.routeChange(alias)}
                            className={s.but}
                            variant={'outlined'}
                        >
                            {name}
                        </Button>
                    </NextLink>
                </div>
            </div>
        );
    }
}

export default Card;
