import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import MyModal from "../components/UI/modal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { useSortedAndSearchedPosts } from "../hooks/usePosts";
import { getPageCount } from "../utils/pages";

function Posts() {
  // posts
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
    setPosts([...posts, ...response.data])
  })

  const createPost = (newPost) => { setPosts([...posts, newPost]); setModal(false) }
  const removePost = (post) => setPosts(posts.filter(p => p.id !== post.id))

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedPosts = useSortedAndSearchedPosts(posts, filter.sort, filter.query);

  const lastDOMElement = useRef()

  // modal
  const [modal, setModal] = useState(false)

  // hooks
  useObserver(lastDOMElement, page < totalPages, isPostsLoading, () => setPage(page + 1))

  useEffect(() => {
    fetchPosts()
  }, [page])



  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError &&
        <h1>Error</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов 1'} />
      <div ref={lastDOMElement} style={{height: 20, background: 'red'}}></div>
      {isPostsLoading &&
        <Loader />
      }
      <Pagination setPage={setPage} totalPages={totalPages} page={page} />
    </div>
  );
}

export default Posts;
