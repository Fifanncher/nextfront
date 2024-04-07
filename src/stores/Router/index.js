import {observable, action, makeObservable, computed, toJS} from 'mobx';

const isServer = typeof window === 'undefined';

class RouterStore {
    @observable searchValue = '';
    @observable fastfilter = null;

    @observable watched = new Set();
    @observable location = {};
    @observable match = {};
    @observable history = {};

    @observable router = {};
    @observable isService;

    constructor({router} = {}) {
      makeObservable(this);

      this.router = router;
      this.fastfilter = router.query.fastfilter || '';

      if (!isServer) {
        this.watched = new Set(JSON.parse(localStorage.getItem('watched')) || []);
      }
    }

    @computed get pathname() {
      return this.router.pathname;
    }

    @computed get query() {
      return this.router.query;
    }

    @action addWatched = (id) => {
      if (this.watched.has(id) || isServer) {
        return;
      }
      const _watched = toJS(this.watched);

      _watched.add(id);
      localStorage.setItem('watched', JSON.stringify(Array.from(_watched)));
      this.setWatched(_watched);
    }

    @action setWatched = (watched) => {
      this.watched = watched;
    }

    @action push = async(params) => {
      await this.router.push(params);
    }

    @action setValue = ({target: {value}}) => {
      this.searchValue = value;
    }

    @action search = async() => {
      this.fastfilter = this.searchValue.trim();
      this.push({
        pathname: '/catalog',
        query: {
          fastfilter: this.fastfilter
        }
      },
      '/catalog',
      {shallow: true});
    }

  @action clearSearch = () => {
    this.searchValue = null;
    this.fastfilter = null;

    this.push({
      pathname: '/catalog',
      query: { }
    },
    '/catalog',
    {shallow: true});
  }
}

// Global store
export default RouterStore;
