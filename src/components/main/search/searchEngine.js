import {BoldOutlined, CodeOutlined, GoogleOutlined, WindowsOutlined} from "@ant-design/icons";

const engine={
    "baidu":{
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
    },
    "google":{
        name:"google",
        url:"https://www.google.com/search?q=",
        suffix:(
            <GoogleOutlined
                style={{
                    fontSize: 24,
                    color:"rgb(251,188,5)",
                }}
            />
        )
    },
    "bing":{
        name:"bing",
        url:"https://www.bing.com/search?q=",
        suffix:(
            <WindowsOutlined
                style={{
                    fontSize: 24,
                    color:"rgb(242,101,34)",
                }}
            />
        )
    },
    "baiduDev":{
        name:"baiduDev",
        url:"https://kaifa.baidu.com/searchPage?wd=",
        suffix:(
            <CodeOutlined
                style={{
                    fontSize: 24,
                    color: '#1890ff',
                }}
            />
        )
    },
}

function selectEngine(engineName){
    return engine[engineName];
}

export default selectEngine;