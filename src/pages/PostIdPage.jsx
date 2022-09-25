import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import LoaderContainer from '../components/UI/loader/loaderContainer/LoaderContainer';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams()

    const [post, setPost] = useState({})
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [comments, setComments] = useState([])
    const [fetchCommentsByPostId, isLoadingComment, errorComments] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostID(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentsByPostId(params.id)
    }, [])

    return (
        <div>
            <h1>Post page c id = {params.id}</h1>
            <LoaderContainer isLoading={isLoading}>
                <div>{post.id}. {post.title}</div>
            </LoaderContainer>
            <LoaderContainer isLoading={isLoadingComment}>
                <div>{comments.map((comm) => 
                    <div key={comm.id} style={{marginTop: '15px'}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}</div>
            </LoaderContainer>
        </div>
    );
};

export default PostIdPage;