import React, { useState } from 'react'
import * as API from "../../api";
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IProps {
    id: string | undefined
    email: string
}
const Comments = (props: React.PropsWithChildren<IProps>) => {
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const sendComment = () => {
        if(props.email){
        const data = {
            id: props.id,
            email: props.email,
            comment: comment
        }
        API.addComment(data)
            .then(() => {
                setComment("");
                getComments()
            })
            .catch((error) => {
                alert("error");
            })
        }else{
            alert("Yorum atmak için giriş yapmalısınız");
            navigate("/signin")
        }
    }
    const getComments = () => {
        API.getComments(props.id || "")
            .then((result) => {
                setComments(result.data.data);
            })
            .catch((error) => {
                alert("error");
            })
    }
    useEffect(() => {
        API.getComments(props.id || "")
        .then((result) => {
            setComments(result.data.data);
        })
        .catch((error) => {
            alert("error");
        })
    }, [props.id])

    return (
        <div className='comment-content'>
            <h1>Yorumlar ({comments.length})</h1>
            <div className='commnets'>
                {comments.map((item: any) => {
                    return (
                        <div className='comment' key={item.createdAt}>
                            <h1>{item.sender}</h1>
                            <p>{item.comment}</p>
                            <span>{item.createdAt}</span>
                        </div>
                    )
                })}
            </div>
            <div className='commnet-send'><textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button variant="outline-success" onClick={() => sendComment()}>Gönder</Button>
            </div>
        </div>
    )
}

export default Comments