import './App.css';
import {Col, Row} from "antd";
import Main from "./components/main";
import Navigator from "./components/navigator";
import Todo from "./components/todo";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Row style={{height:"70vh"}}>
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
    </QueryClientProvider>
  );
}

export default App;
