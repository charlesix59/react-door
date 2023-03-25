import {List, Radio} from "antd";
import {dbContext} from "../App";
import {getDataByIndex} from "../utils/dbUtils";
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
                setData(e)
            })
        }).catch(e=>{console.error(e)})
    },[db])
    return(
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Radio></Radio>
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