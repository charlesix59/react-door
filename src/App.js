import './App.css';
import {Card, Col, Row} from "antd";
import Main from "./components/main/main";
import Navigator from "./components/portal/navigator";
import Todo from "./components/todo/todo";
import {openDB} from "./utils/dbUtils";
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
        <div style={{background:"#e4e6eb"}}>
            <Card style={{width:"80%",maxWidth:"1440px",margin:"auto"}}>
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
            </Card>
        </div>
    </dbContext.Provider>
  );
}

export default App;
