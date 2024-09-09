import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const Home = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch posts from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className=" bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-700 my-8 ">All Posts</h1>
      <div className="container mx-auto px-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading ? (
          // Display skeleton loaders while posts are being fetched
          Array(28).fill().map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-6 p-4">
              <Skeleton height={30} width="100%" className="mb-2" />
              <Skeleton count={3} />
            </div>
          ))
        ) : (
          filteredPosts.length === 0 ? (
            <p className="text-center w-full col-span-full">No posts found.</p>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="bg-white shadow-md rounded-lg mb-6 p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.body}</p>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default Home;
