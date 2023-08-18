const openDB = function () {
    return new Promise((resolve, reject) => {
        const indexedDB: IDBFactory = window.indexedDB
        let db: IDBDatabase= null
        const req = indexedDB.open("door", 1)
        // get db connection if already have a database
        req.onsuccess = function () {
            // 数据库对象
            db = req.result
            resolve({code: 0, success: true, data: db, msg: '数据库打开成功!'})
        }
        req.onerror = function (event) {
            reject({code: -1, success: false, data: null, msg: '数据库打开失败!reason：' + event.target})
        }
        // rebuild the database
        req.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            db = event.target.result // 数据库对象
            let objectStore: IDBObjectStore
            if (!db.objectStoreNames.contains("task")) {
                objectStore = db.createObjectStore("task", {keyPath: "id", autoIncrement: true}) // 创建表
                objectStore.createIndex("type", "type", {unique: false}) // 创建索引
            }
            if (!db.objectStoreNames.contains("schedule")) {
                objectStore = db.createObjectStore("schedule", {keyPath: "id", autoIncrement: true})
                objectStore.createIndex("date", "date", {unique: false})
                objectStore.createIndex("title", "title", {unique: false})
            }
        }
    })
}

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {Object} data 数据
 **/
const addData = function (db: IDBDatabase, storeName: string, data: unknown) {
    return new Promise((resolve, reject) => {
        console.log(data)
        const req = db
            .transaction([storeName], 'readwrite')
            .objectStore(storeName) // 仓库对象
            .add(data)
        // 操作成功
        req.onsuccess = function () {
            console.log('数据写入成功')
            resolve({code: 0, success: true, data: null, msg: '数据写入成功!'})
        }
        // 操作失败
        req.onerror = function (event) {
            console.log('数据写入失败')
            const data = {code: -1, success: false, data: null, msg: '数据写入失败!' + event}
            reject(data)
        }
    })
}

/**
 * 新增或更新数据
 * @param db 数据库链接
 * @param storeName 库名
 * @param data 数据
 * @return {Promise<unknown>} 返回一个promise
 */
const updateData = function (db: IDBDatabase, storeName: string, data: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const req = db
            .transaction([storeName], 'readwrite')
            .objectStore(storeName)
            .put(data)
        // 操作成功
        req.onsuccess = function () {
            console.log('数据更新成功')
            resolve({code: 0, success: true, data: null, msg: '数据更新成功!'})
        }
        // 操作失败
        req.onerror = function (event) {
            console.log('数据更新失败')
            const data = {code: -1, success: false, data: null, msg: '数据更新失败!' + event}
            reject(data)
        }
    })
}

/**
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param id 要删除的数据id
 * @return {Promise<unknown>}
 */
const deleteData = function (db: IDBDatabase, storeName: string, id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const req = db
            .transaction([storeName], 'readwrite')
            .objectStore(storeName)
            .delete(id)
        // 操作成功
        req.onsuccess = function () {
            console.log('数据更新成功')
            resolve({code: 0, success: true, data: null, msg: '数据更新成功!'})
        }
        // 操作失败
        req.onerror = function (event) {
            console.log('数据更新失败')
            const data = {code: -1, success: false, data: null, msg: '数据更新失败!' + event}
            reject(data)
        }
    })
}

/**
 * 根据索引找数据
 * @param {Object} db 数据实例
 * @param {string} storeName
 * @param {string} indexName
 * @param indexValue
 * */
const getDataByIndex = function (
    db: IDBDatabase, storeName: string,
    indexName: string,
    indexValue: IDBValidKey | IDBKeyRange
) {
    if (!db) {
        return "";
    }
    const store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    const request = store.index(indexName).getAll(indexValue)
    return new Promise((resolve, reject) => {
        request.onerror = function (e) {
            reject(e)
        }
        request.onsuccess = function (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resolve(e.target.result)
        }
    })
}

/**
 * 根据主键查询
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName
 * @param {number} key
 * @return {string|Promise<unknown>}
 */
const getDataByKey = function (db: IDBDatabase, storeName: string, key: number): string | Promise<unknown> {
    if (!db) {
        return "";
    }
    const store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    const request = store.get(key);
    return new Promise((resolve, reject) => {
        request.onerror = function (e) {
            reject(e)
        }
        request.onsuccess = function (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resolve(e.target.result)
        }
    })
}

export {openDB, addData, updateData, getDataByIndex, deleteData, getDataByKey}