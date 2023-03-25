import {List, Radio, Tag} from "antd";

/**
* this function will show your target
*  */
function Task(){
    let data = []
    return(
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Radio></Radio>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description={item.detail}
                    />
                    <Tag color="#2db7f5">截止至{item.limitDate.substr(0,10)}</Tag>
                </List.Item>
            )}
        />
    )
}
export default Task