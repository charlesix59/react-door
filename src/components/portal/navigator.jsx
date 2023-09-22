import {Button, Input, Modal, Row, Space} from "antd";
import Favorite from "./favorite";
import {useContext, useRef, useState} from "react";
import {dbContext} from "../../App";
import {addData} from "../../utils/dbUtils.ts";

function Navigator() {
    const [isOpen, setIsOpen] = useState(false)
    const titleInputRef = useRef()
    const urlInputRef = useRef()
    const iconInputRef = useRef()
    const descriptionInputRef = useRef()
    const categoryInputRef = useRef()
    const db = useContext(dbContext)
    const openModel = () => {
        setIsOpen(true)
    }
    const modelOkHandler = () => {
        const obj = {
            title: titleInputRef.current?.input?.value,
            url: urlInputRef.current?.input?.value,
            icon: iconInputRef.current?.input?.value,
            description: descriptionInputRef.current?.input?.value,
            category: categoryInputRef.current?.input?.value,
        }
        addData(db,'favorite',obj).then(res=>{
            console.log(res)
        })
        setIsOpen(false)
    }
    const modelCancelHandler = () => {
        setIsOpen(false)
    }
    return (
        <div className={"space-container"}>
            <Row justify="space-between">
                <Favorite/>
            </Row>
            <Row>
                <Button onClick={openModel}>
                    添加导航网站
                </Button>
                <Modal title={"添加导航网站"} open={isOpen} onOk={modelOkHandler} onCancel={modelCancelHandler}>
                    <Space direction={"vertical"} style={{width: "100%"}}>
                        <Input placeholder={"title"} ref={titleInputRef}/>
                        <Input placeholder={"url"} ref={urlInputRef}/>
                        <Input placeholder={"icon"} ref={iconInputRef}/>
                        <Input placeholder={"description"} ref={descriptionInputRef}/>
                        <Input placeholder={"category"} ref={categoryInputRef}/>
                    </Space>
                </Modal>
            </Row>
        </div>
    )
}

export default Navigator