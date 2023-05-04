import {Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {BoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import selectEngine from "./searchEngine";
const { Search } = Input;

function MultiSearch(){
    let suffix;
    const [searchEngine,setSearchEngine] = useState({
            name:"baidu",
            url:"https://www.baidu.com/s?wd=",
            suffix:(
                <BoldOutlined
                    style={{
                        fontSize: 24,
                        color: '#1890ff',
                    }}
                />
            )
        });

    // this method will be called when click search button
    const onSearch = (value) => {
        console.log(value)
        window.open(searchEngine.url+value,"_blank")
    };

    suffix = searchEngine.suffix

    const changeEngine = function (e){
        setSearchEngine(selectEngine(e)||searchEngine);
    }

    const selectAfter = (
        <Select defaultValue="必应" onChange={(e)=>{changeEngine(e)}}>
            <Option value="baidu">百度</Option>
            <Option value="baiduDev">百度开发者</Option>
            <Option value="google">谷歌</Option>
            <Option value="bing">必应</Option>
        </Select>
    );

    return(
        <div className={"search"}>
            <Search
                addonBefore={selectAfter}
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
            />
        </div>
    )
}
export default MultiSearch