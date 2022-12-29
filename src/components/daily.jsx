import {List, Radio} from "antd";
import {useQuery} from "@tanstack/react-query";
import request from "../utils/request";

function Daily(){
    const {isLoading, error, data} = useQuery({
        queryKey: ["daily"],
        queryFn: () =>
            request
                .get("/todo/daily")
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
                </List.Item>
            )}
        />
    )
}
export default Daily