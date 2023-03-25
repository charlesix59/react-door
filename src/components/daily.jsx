import {List, Radio} from "antd";

function Daily(){
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
                </List.Item>
            )}
        />
    )
}
export default Daily