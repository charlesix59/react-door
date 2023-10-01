import {getAllByCursor} from "../utils/dbUtils";


const storeName = 'favorite'
const getFavorites = async (db) => {
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