import {Card, Col, Divider, Empty} from "antd";
import Meta from "antd/es/card/Meta";

function Category(props){
    // console.log(props)
    return(
        <>
            <Divider orientation="left">{props.deta.key}</Divider>
            {
                props.deta.value.map((item,key)=>(
                    <Col span={4} key={key}>
                        <a href={item.url} target={"_blank"} rel="noreferrer">
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="icon" src={item.icon} height={144}/>}
                            >
                                <Meta style={{maxHeight:"5rem"}} title={item.title} description={item.description} />
                            </Card>
                        </a>
                    </Col>
                ))
            }
        </>
    )
}

function Favorite(){
    let data = []

    if(!data || data.length===0){
        return <Empty/>
    }
    const array = [];
    for (const key in data){
        array.push({
            key:key,
            value:data[key]
        })
    }

    return(
        <>
            {
                array.map((category,key)=>(
                    <Category key={key} deta={category}/>
                ))
            }
        </>
    )

}
export default Favorite