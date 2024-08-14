import Cookies from 'js-cookie';

class CookieStateStore {
    get(key) {
        return Promise.resolve(Cookies.get(key));
    }

    set(key, value) {
        Cookies.set(key, value, { secure: true, sameSite: 'Strict', expires: 7 });
        return Promise.resolve();
    }

    remove(key) {
        Cookies.remove(key);
        return Promise.resolve();
    }
}

export default CookieStateStore;
