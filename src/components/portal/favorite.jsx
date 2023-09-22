import {Card, Col, Divider, Empty} from "antd";
import Meta from "antd/es/card/Meta";
import {useContext, useEffect, useState} from "react";
import {getFavorites} from "../../dao/favoriteDao.ts";
import {dbContext} from "../../App";

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
                                cover={
                                    <div style={{height: "144px",display: "grid"}}>
                                        <img alt="icon" src={item.icon} style={{margin: "auto"}} />
                                    </div>
                                }
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
    const db = useContext(dbContext);
    let [favorites,setFavorite] = useState({});

    useEffect( () => {
        getFavorites(db).then(res=>{
            setFavorite(res);
        })
    }, [db]);

    console.log(favorites);

    if(!favorites || favorites.length===0){
        return <Empty/>
    }
    const array = [];
    for (const key in favorites){
        array.push({
            key:key,
            value:favorites[key]
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