
class ListStorage {
    constructor(listName = "list") {
        this.listName = listName;
        this.list = {}
        this.load();
    }
    add(key, value) {
        this.list[key] = value;
        this.save();
    }
    delete(key) {
        delete this.list[key]
        this.save();
    }
    save() {
        localStorage.setItem(this.listName, JSON.stringify(this.list));
    }
    load() {
        this.list = JSON.parse(localStorage.getItem(this.listName)) || {};
    }
}