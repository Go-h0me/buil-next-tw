import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSession, getSession, getProviders } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import { modalState } from '../atoms/modalAtom'
import { onSnapshot, doc, query, orderBy, collection } from 'firebase/firestore'
import Login from '../components/Login'
import { db } from '../firebase'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import Post from '../components/Post'
import Comment from '../components/Comment'
import Modal from '../components/Modal'
import Widgets from '../components/Widgets'
//funtion tuong tu ham index

function postPage({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])

  //truyen id
  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db]
  )
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>
          {post?.username} on Tweeter:"{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <div
          className="max-w-2xl flex-grow border-l border-r
        border-gray-700 sm:ml-[73px] xl:ml-[370px]
        "
        >
          <div
            className="sticky top-0 z-50 flex items-center
            gap-x-4 border-b border-gray-700 bg-black
            px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]
            "
          >
            <div
              className="hover:Animation flex h-9 w-9 items-center
                justify-center xl:px-0
                "
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Gohome
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        <Widgets trendingResults={trendingResults}
        followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  )
}
export default postPage

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
