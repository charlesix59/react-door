const openDB = function () {
    return new Promise((resolve, reject) => {
        //  兼容浏览器
        let indexedDB =
            window.indexedDB
        let db = null
        const req = indexedDB.open("door", 1)
        // 操作成功
        req.onsuccess = function () {
            // 数据库对象
            db = req.result
            resolve({code: 0, success: true, data: db, msg: '数据库打开成功!'})
        }
        // 操作失败
        req.onerror = function (event) {
            reject({code: -1, success: false, data: null, msg: '数据库打开失败!reason：'+event.target})
        }
        // 创建表和索引
        req.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            db = event.target.result // 数据库对象
            let objectStore
            if (!db.objectStoreNames.contains("task")) {
                objectStore = db.createObjectStore("task", {keyPath:"id", autoIncrement: true }) // 创建表
                objectStore.createIndex("type", "type", { unique: false }) // 创建索引
            }
            if(!db.objectStoreNames.contains("schedule")){
                objectStore = db.createObjectStore("schedule", {keyPath:"id", autoIncrement: true })
                objectStore.createIndex("date","date",{unique: false})
                objectStore.createIndex("title","title",{unique: false})
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
const addData = function (db, storeName, data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        let req = db
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
            let data = {code: -1, success: false, data: null, msg: '数据写入失败!'+event}
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
const updateData = function (db,storeName,data) {
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
            let data = {code: -1, success: false, data: null, msg: '数据更新失败!'+event}
            reject(data)
        }
    })
}

/**
 *
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param id 要删除的数据id
 * @return {Promise<unknown>}
 */
const deleteData = function (db, storeName, id){
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
            let data = {code: -1, success: false, data: null, msg: '数据更新失败!'+event}
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
const getDataByIndex = function (db,storeName,indexName,indexValue){
    if(!db){
        return "";
    }
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    let request = store.index(indexName).getAll(indexValue)
    return new Promise((resolve, reject) => {
        request.onerror = function(e) {
            reject(e)
        }
        request.onsuccess = function(e) {
            resolve(e.target.result)
        }
    })
}

export {openDB,addData,updateData,getDataByIndex,deleteData}