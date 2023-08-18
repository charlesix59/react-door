import './App.css';
import {Col, Row} from "antd";
import Main from "./components/main/main";
import Navigator from "./components/portal/navigator";
import Todo from "./components/todo/todo";
import {openDB} from "./utils/dbUtils.ts";
import {createContext, useEffect, useState} from "react";
export const dbContext = createContext(null)

function App() {
    const [db,setDb] = useState(null)
    useEffect(()=>{
            openDB().then(e=>{
                setDb(e.data)
            }).catch(e=>{
                console.log(e)
            })
        },[]
    )

  return (
    <dbContext.Provider value={db}>
        <Row style={{height:"100vh"}}>
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
    </dbContext.Provider>
  );
}

export default App;
