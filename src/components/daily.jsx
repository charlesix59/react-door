import {List, Radio} from "antd";
import {dbContext} from "../App";
import {getDataByIndex, updateData} from "../utils/dbUtils";
import {useContext, useEffect, useState} from "react";

function Daily(){
    const db = useContext(dbContext)
    const [data,setData] = useState([])
    useEffect(()=>{
        new Promise((resolve, reject) => {
            if (db)
                resolve()
            else
                reject()
        }).then(()=>{
            getDataByIndex(db,"task","type","daily").then(e=>{
                const arr = [];
                for(let item of e){
                    if(item.endTime.getDay()!==new Date().getDay()){
                        arr.push(item)
                    }
                }
                setData(arr)
            })
        }).catch(e=>{console.error(e)})
    },[db])
    const selectHandler = function (e){
        e.target.checked = false;
        const arr = JSON.parse(JSON.stringify(data));
        arr[parseInt(e.target.name)].endTime = new Date();
        updateData(db, "task",arr[parseInt(e.target.name)]).then().catch(e=>{console.log(e)})
        arr.splice(parseInt(e.target.name),1);
        setData(arr);
    }
    return(
        <List
            onChange={selectHandler}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item,key) => (
                <List.Item key={item.id}>
                    <Radio name={key}></Radio>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}
export default Daily