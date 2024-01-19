import { useEffect, useState } from "react";
import React from "react";
import service from "../appwrite/config";
import { Container, Postcard } from "../components";

function Home() {
    const [post, setPosts] = useState([])
    
    useEffect(()=>{
        service.getPost().then((post)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })

    },[])

    if (post.length === 0) {
        return(
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    return(<div className=" w-full py-8">
         <Container>
                <div className='flex flex-wrap'>
                    {post.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
    </div>)
    
}

export default Home;