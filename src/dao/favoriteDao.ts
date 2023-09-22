// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getAllByCursor} from "../utils/dbUtils.ts";


const storeName = 'favorite'
const getFavorites = async (db:IDBDatabase) => {
    try {
        const data = await getAllByCursor(db,storeName)
        const res = {};
        for(const item of data){
            const category = item["category"]
            if(res[category]){
                res[category].push(item);
            }
            else{
                res[category] = [item];
            }
        }
        return res;
    }
    catch (e){
        console.log(e)
    }
}

export {getFavorites}