import {Dropdown, List, Radio} from "antd";
import {dbContext, messageContext} from "../../App";
import {deleteData, getDataByIndex, updateData} from "../../utils/dbUtils";
import {useContext, useEffect, useState} from "react";
import {MenuOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

function Daily({count}) {
    const db = useContext(dbContext)
    const message = useContext(messageContext)
    const [data, setData] = useState([])
    const [reload, setReload] = useState(false);

    // get daily task and push those not done today to state Array to show
    useEffect(() => {
        getDataByIndex(db, "task", "type", "daily").then(e => {
            const arr = [];
            for (let item of e) {
                if (!item.endTime || new Date(item.endTime.$d).getDate() !== new Date().getDate()) {
                    arr.push(item)
                }
            }
            setData(arr)
        })
    }, [db, reload, count])

    // when select the radio, set task done
    const selectHandler = function (e) {
        e.target.checked = false;
        const arr = JSON.parse(JSON.stringify(data));
        arr[parseInt(e.target.name)].endTime = dayjs();
        updateData(db, "task", arr[parseInt(e.target.name)]).then().catch(e => {
            message.open({
                type: "error",
                content: "数据库操作失败，请查看console"
            }).then(r => r)
            console.log(e)
        })
        arr.splice(parseInt(e.target.name), 1);
        setData(arr);
    }

    // delete daily from db
    const deleteTodo = function (id) {
        deleteData(db, "task", id).then(() => {
            message.open({
                type: "success",
                content: "日常任务删除成功"
            }).then(r => r)
        }).catch((res) => {
            console.log(res)
            message.open({
                type: "error",
                content: "日常任务删除失败，请查看console"
            }).then(r => r)
        })
        setReload(!reload)
    }
    const bubbleClickHandler = function (e, id) {
        if (e.target.className === "deleteDropDown") {
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

    return (
        <List
            onChange={selectHandler}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, key) => (
                <List.Item key={item.id} onClick={(e) => {
                    bubbleClickHandler(e, item.id)
                }}>
                    <Radio name={key}></Radio>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description={item.description}
                    />
                    <Dropdown menu={{items}} trigger={['click']}>
                        <MenuOutlined/>
                    </Dropdown>
                </List.Item>
            )}
        />
    )
}

export default Daily