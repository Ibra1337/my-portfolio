// src/CookieStorage.js

class CookieStorage {
  constructor() {
    this.storePrefix = 'oidc.';
  }

  set(key, value) {
    try {
      document.cookie = `${this.storePrefix}${key}=${encodeURIComponent(value)}; path=/`;
    } catch (err) {
      console.error('Error setting cookie:', err);
    }
  }

  get(key) {
    try {
      const name = `${this.storePrefix}${key}=`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
          return decodeURIComponent(cookie.substring(name.length));
        }
      }
      return null;
    } catch (err) {
      console.error('Error getting cookie:', err);
      return null;
    }
  }

  remove(key) {
    try {
      document.cookie = `${this.storePrefix}${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (err) {
      console.error('Error removing cookie:', err);
    }
  }

  // Static method to create an instance of CookieStorage
  static createInstance() {
    return new CookieStorage();
  }
}

export default CookieStorage;
