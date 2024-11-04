import React from 'react';
import {inject} from 'mobx-react';
import s from './Article.module.scss';
import ArticleContent from './Content';
import Cards from "../../../NewsCards/Cards";
import NextLink from 'next/link';
import Button from '../../../Button';
import dayjs from 'dayjs';
import Head from "next/head";

require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        article: ArticlesStore.article || {},
        articles: ArticlesStore.articles || [],
    };
})
class ArticlesView extends React.Component {

    render() {
        const {article, articles, alias} = this.props;
        const {title, content} = article;

        return (
            <React.Fragment>
                <Head>
                    <title>  {title} </title>
                    <meta
                        name="description"
                        content={content}
                    />
                    <script type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                    {
                                        "@context": "http://schema.org",
                                        "@type": "BreadcrumbList",
                                        "itemListElement":
                                            [
                                                {
                                                    "@type": "ListItem",
                                                    "position": 1,
                                                    "item":
                                                        {
                                                            "@id": "https://master-pola.com/blog",
                                                            "name": "Блог"
                                                        }
                                                },
                                                {
                                                    "@type": "ListItem",
                                                    "position": 2,
                                                    "item":
                                                        {
                                                            "@id": "https://master-pola.com/article/${alias}",
                                                            "name": {title}
                                                        }
                                                }
                                            ]
                                    }
                                )
                            }}
                    ></script>
                </Head>
                <div className={s.content}>
                    <div className={s.sidebar}>
                        <div className={s.cards}>
                            <Cards articles={articles.filter(({alias: _alias}) => alias !== _alias).slice(0, 2)}/>
                        </div>
                        <NextLink
                            href={{
                                pathname: '/blog',
                            }}
                            as={`/blog`}
                            passHref
                            shallow={true}
                        >
                            <Button color={'secondary'}> ВCЕ ПОСТЫ </Button>
                        </NextLink>
                    </div>
                <ArticleContent/>
                </div>
            </React.Fragment>
        );
    }
}

export default ArticlesView;
