import {observable, action, makeObservable, computed, when, autorun} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

const isServer = typeof window === 'undefined';

class ArticlesStore {
    @observable status = statusEnum.LOADING;
    @observable statusArticle = statusEnum.LOADING;

    @observable articles = [];
    @observable article;
    @observable alias;
    @observable filter = 'all';

    constructor(RootStore) {
      makeObservable(this);
      this.hydrate(RootStore);

      if (!isServer) {
        this.getArticleDisposer = autorun(this.getArticle);
        this.getArticlesDisposer = autorun(this.getArticles);
      }
    }

    hydrate(RootStore) {
      const {ArticlesStore = {}} = RootStore.initialData || {};

      this.alias = ArticlesStore.alias;
      this.articles = ArticlesStore.articles || this.articles;
      this.article = ArticlesStore.article;
      this.filter = ArticlesStore.filter || this.filter;
    }

    @computed get articlesFiltered() {

      if (this.filter === 'all') {
        return this.articles;
      }

      return this.articles.filter(({type}) => type === this.filter);
    }

    @action merge = ({article, alias, articles}) => {
      this.article = article;
      this.articles = articles;
      this.alias = alias;
    }

    @action setFilter = (_, value) => {
      this.filter = value;
    }

    @action setStatusArticle = (status) => {
      this.statusArticle = status;
    }

    @action setStatus = (status) => {
      this.status = status;
    }

    @action setArticle = (article) => {
      this.article = article;
    }

    @action setArticles = (articles) => {
      this.articles = articles;
    }

    @action setAlias = (alias) => {
      this.alias = alias;
    }

    getArticle = async() => {
      if (!this.alias) {
        return;
      }

      try {
        this.setStatusArticle(statusEnum.LOADING);
        const {alias} = this;
        const article = await api.post('article/get', {alias});

        this.setArticle(article);
        this.setStatusArticle(statusEnum.SUCCESS);
      } catch(err) {
        this.setStatusArticle(statusEnum.ERROR);
      }
    }

    getArticles = async() => {
      this.setStatus(statusEnum.LOADING);
      try {
        const articles = await api.post('articles/getArticles', {});

        this.setArticles(articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        this.setStatus(statusEnum.SUCCESS);
      } catch(e) {
        this.setStatus(statusEnum.ERROR);
        alert({type: 'error', title: 'Ошибка при получении статей'});
      }
    }
}

export {ArticlesStore};
