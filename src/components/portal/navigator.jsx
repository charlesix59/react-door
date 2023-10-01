import {Button, Input, Modal, Row, Space} from "antd";
import Favorite from "./favorite";
import {useContext, useRef, useState} from "react";
import {dbContext} from "../../App";
import {addData, getDataByKey, updateData} from "../../utils/dbUtils.ts";

function Navigator() {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const titleInputRef = useRef()
    const urlInputRef = useRef()
    const iconInputRef = useRef()
    const descriptionInputRef = useRef()
    const categoryInputRef = useRef()

    const [editTitle,setEditTitle] = useState("")
    const [editUrl,setEditUrl] = useState("")
    const [editIcon,setEditIcon] = useState("")
    const [editDescription,setEditDescription] = useState("")
    const [editCategory,setEditCategory] = useState("")

    const [childCount,setChildCount] = useState(0)

    let editId = useRef(0);

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
        addData(db, 'favorite', obj).then(res => {
            console.log(res)
            setIsOpen(false)
        })
    }
    const modelCancelHandler = () => {
        setIsOpen(false)
    }

    // when click edit button, call this function
    const editClickHandler = (e) => {
        if (e.target && e.target.id) {
            editId.current = parseInt(e.target.id.toString().substring(4))
            getDataByKey(db,'favorite',editId.current).then((res)=>{
                const {title,url,icon,description,category} = res
                setEditTitle(title)
                setEditUrl(url)
                setEditIcon(icon)
                setEditDescription(description)
                setEditCategory(category)
            }).finally(()=>{
                setIsEditOpen(true)
            })
        }
    }
    const editOkHandler = () => {
        const obj = {
            id: editId.current,
            title: editTitle,
            icon: editIcon,
            url: editUrl,
            description: editDescription,
            category: editCategory
        }
        updateData(db, 'favorite', obj).then(() => {
            setChildCount(childCount+1)
        }).finally(()=>{
            setIsEditOpen(false)
        })
    }
    const editCancelHandler = () => {
        console.log(editTitle)
        setIsEditOpen(false)
    }
    return (
        <div className={"space-container"}>
            <Row justify="space-between" onClick={editClickHandler}>
                <Favorite count={childCount}/>
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
                <Modal title={"编辑导航网站"} open={isEditOpen} onOk={editOkHandler} onCancel={editCancelHandler}>
                    <Space direction={"vertical"} style={{width: "100%"}}>
                        <Input placeholder={"title"} value={editTitle}
                               onChange={e=>{setEditTitle(e.target.value)}}
                        />
                        <Input placeholder={"url"} value={editUrl}
                               onChange={e=>{setEditUrl(e.target.value)}}
                        />
                        <Input placeholder={"icon"} value={editIcon}
                               onChange={e=>{setEditIcon(e.target.value)}}
                        />
                        <Input placeholder={"description"} value={editDescription}
                               onChange={e=>{setEditDescription(e.target.value)}}
                        />
                        <Input placeholder={"category"}  value={editCategory}
                               onChange={e=>{setEditCategory(e.target.value)}}
                        />
                    </Space>
                </Modal>
            </Row>
        </div>
    )
}

export default Navigator