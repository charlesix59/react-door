import {Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {BoldOutlined, GoogleOutlined, WindowsOutlined} from "@ant-design/icons";
import {useState} from "react";
const { Search } = Input;

function MultiSearch(){
    const onSearch = (value) => {
        console.log(value)
        if(searchEngine==="baidu"){
            window.open("https://www.baidu.com/s?wd="+value,"_blank")
        }else if (searchEngine==="bing"){
            window.open("https://www.bing.com/search?q="+value,"_blank")
        }else {
            window.open("https://www.google.com/search?q="+value,"_blank")
        }
    };
    let suffix;
    const [searchEngine,setSearchEngine] = useState("baidu");
    if (searchEngine==="baidu"){
        suffix=(
            <BoldOutlined
                style={{
                    fontSize: 24,
                    color: '#1890ff',
                }}
            />
        )
    }
    else if (searchEngine==="google"){
        suffix=(
            <GoogleOutlined
                style={{
                    fontSize: 24,
                    color:"rgb(251,188,5)",
                }}
            />
        )
    }
    else {
        suffix=(
            <WindowsOutlined
                style={{
                    fontSize: 24,
                    color:"rgb(242,101,34)",
                }}
            />
        )
    }
    const selectAfter = (
        <Select defaultValue="百度" onChange={(e)=>{setSearchEngine(e)}}>
            <Option value="baidu">百度</Option>
            <Option value="google">谷歌</Option>
            <Option value="bing">必应</Option>
        </Select>
    );
    return(
        <Search
            addonBefore={selectAfter}
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
            style={{
                width: 700,
                marginBottom: "6rem",
            }}
        />
    )
}
export default MultiSearch