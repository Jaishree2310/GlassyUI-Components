import React, { useState, useEffect } from 'react';

interface Post {
  title: string;
  content: string;
  category: string;
  date: string;
}

const Stories = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/stories/getposts',
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content && category) {
      const newPost = {
        title,
        content,
        category,
        date: new Date().toISOString(),
      };
      try {
        const response = await fetch(
          'http://localhost:5000/api/stories/saveposts',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
          },
        );
        if (response.ok) {
          const savedPost = await response.json();
          setPosts([savedPost, ...posts]);
        } else {
          console.error('Failed to save the post');
        }
      } catch (error) {
        console.error('Error saving the post:', error);
      }
      setTitle('');
      setContent('');
      setCategory('');
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10'>
      {/* Page Heading */}
      <h1 className='text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-10 mt-10'>
        Real Stories, Real Advice
      </h1>
      <p className='text-center text-gray-300 text-lg mb-10 -mt-6'>
        Share your experience with the community
      </p>

      <div className='flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto'>
        {/* Left Side — Posts Feed */}
        <div className='flex-1 space-y-6'>
          {posts.length === 0 ? (
            <div className='flex items-center justify-center h-64 bg-opacity-40 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-30 border-gray-300'>
              <p className='text-gray-400 text-lg'>
                No posts yet. Share your experience!
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className='bg-opacity-40 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-30 border-gray-300 p-8 transition-all duration-300 ease-in-out hover:shadow-blue-900/30 hover:shadow-2xl'
              >
                <h3 className='text-2xl font-extrabold text-white mb-1'>
                  {post.title}
                </h3>
                <p className='text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4'>
                  {post.category}
                </p>
                <p className='text-gray-300 leading-relaxed mb-6'>
                  {post.content}
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-xs text-gray-500'>
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <button className='bg-blue-600 text-white py-1.5 px-5 rounded-lg text-sm font-bold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'>
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side — Submit Form */}
        <div className='w-full lg:w-[38%] bg-opacity-50 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-20 border-gray-200 p-10'>
          <h2 className='text-3xl font-extrabold mb-8 text-white tracking-wide text-center'>
            Share Your Story
          </h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Title */}
            <div>
              <label className='block text-gray-400 text-sm font-semibold mb-2'>
                TITLE <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='Title of your story'
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='w-full p-4 rounded-lg bg-gray-800 text-white border-none outline-none transition-all duration-300 ease-in-out hover:bg-gray-700 focus:bg-gray-700'
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className='block text-gray-400 text-sm font-semibold mb-2'>
                YOUR STORY <span className='text-red-500'>*</span>
              </label>
              <textarea
                placeholder='Write about your experience...'
                value={content}
                onChange={e => setContent(e.target.value)}
                className='w-full p-4 rounded-lg bg-gray-800 text-white h-36 resize-none border-none outline-none transition-all duration-300 ease-in-out hover:bg-gray-700 focus:bg-gray-700'
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className='block text-gray-400 text-sm font-semibold mb-2'>
                CATEGORY <span className='text-red-500'>*</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='w-full p-4 rounded-lg bg-gray-800 text-white border-none outline-none transition-all duration-300 ease-in-out hover:bg-gray-700 focus:bg-gray-700'
                required
              >
                <option value='' disabled>
                  Select Category
                </option>
                <optgroup label='GlassyUI-Components'>
                  <option value='GlassyUI Introduction'>
                    GlassyUI Introduction
                  </option>
                  <option value='Customizing GlassyUI Components'>
                    Customizing GlassyUI Components
                  </option>
                  <option value='Advanced GlassyUI Techniques'>
                    Advanced GlassyUI Techniques
                  </option>
                  <option value='GlassyUI Best Practices'>
                    GlassyUI Best Practices
                  </option>
                  <option value='Contributing to GlassyUI'>
                    Contributing to GlassyUI
                  </option>
                  <option value='React and GlassyUI Integration'>
                    React and GlassyUI Integration
                  </option>
                  <option value='GlassyUI in Real Projects'>
                    GlassyUI in Real Projects
                  </option>
                  <option value='GlassyUI Updates'>GlassyUI Updates</option>
                </optgroup>
              </select>
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'
            >
              Post Experience
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Stories;
