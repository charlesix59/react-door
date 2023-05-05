import {Dropdown, List, Radio} from "antd";
import {dbContext} from "../../App";
import {deleteData, getDataByIndex, updateData} from "../../utils/dbUtils";
import {useContext, useEffect, useState} from "react";
import {MenuOutlined} from "@ant-design/icons";

function Daily(){
    const db = useContext(dbContext)
    const [data,setData] = useState([])
    const [reload,setReload] = useState(false);

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
    },[db,reload])

    // when select the radio, set task done
    const selectHandler = function (e){
        e.target.checked = false;
        const arr = JSON.parse(JSON.stringify(data));
        arr[parseInt(e.target.name)].endTime = new Date();
        updateData(db, "task",arr[parseInt(e.target.name)]).then().catch(e=>{console.log(e)})
        arr.splice(parseInt(e.target.name),1);
        setData(arr);
    }

    const deleteTodo = function (id){
        deleteData(db,"task",id).then(e=>{console.log(e)})
        setReload(!reload)
    }
    const bubbleClickHandler = function (e,id){
        if(e.target.className==="deleteDropDown"){
            deleteTodo(id)
        }
    }
    // this is the items of dropDown menu
    const items = [
        {
            label: <span className={"deleteDropDown"}>删除</span>,
            key: 'delete',
        },
    ];

    return(
        <List
            onChange={selectHandler}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item,key) => (
                <List.Item key={item.id} onClick={(e)=>{bubbleClickHandler(e,item.id)}}>
                    <Radio name={key}></Radio>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description={item.description}
                    />
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <MenuOutlined />
                    </Dropdown>
                </List.Item>
            )}
        />
    )
}
export default Daily