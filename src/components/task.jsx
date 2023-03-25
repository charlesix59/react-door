import {List, Radio, Tag} from "antd";
import {useQuery} from "@tanstack/react-query";
import request from "../utils/request";

/*
* this function will show your target
*  */
function Task(){
    const {isLoading, error, data} = useQuery({
        queryKey: ["main"],
        queryFn: () =>
            request
                .get("/todo/main")
                .then((res) => res.data),
    });

    // console.log(data)

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
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