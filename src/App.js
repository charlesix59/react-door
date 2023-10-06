import './App.css';
import {Card, Col, message, Row} from "antd";
import Main from "./components/main/main";
import Navigator from "./components/portal/navigator";
import Todo from "./components/todo/todo";
import {openDB} from "./utils/dbUtils";
import {createContext, useEffect, useState} from "react";

export const dbContext = createContext(null)
export const messageContext = createContext(null)

function App() {
    const [db,setDb] = useState(null)
    const [messageAPI, contextHolder] = message.useMessage()
    useEffect(()=>{
            openDB().then(e=>{
                setDb(e.data)
            }).catch(()=>{
                messageAPI.open({
                    type: "error",
                    content: "数据库连接错误"
                }).then(r  => r)
            })
        },[messageAPI]
    )

  return (
    <dbContext.Provider value={db}>
        <messageContext.Provider value={messageAPI}>
            {contextHolder}
            <div className={"background-color"}>
                <Card className={"app-content"}>
                    <Row className={"app-first-page"}>
                        <Col span={18}>
                            <Main/>
                        </Col>
                        <Col span={6}>
                            <Todo/>
                        </Col>
                    </Row>
                    <Row>
                        <Navigator/>
                    </Row>
                </Card>
            </div>
        </messageContext.Provider>
    </dbContext.Provider>
  );
}

export default App;
