// src/InMemoryStateStore.js
class InMemoryStateStore {
    constructor() {
        this.store = new Map(); // Use a JavaScript Map for in-memory storage
    }

    async get(key) {
        return this.store.get(key) || null;
    }

    async set(key, value) {
        this.store.set(key, value);
    }

    async remove(key) {
        this.store.delete(key);
    }
}

export default InMemoryStateStore;
