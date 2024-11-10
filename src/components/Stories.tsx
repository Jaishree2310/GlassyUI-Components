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
    // Fetch posts from the backend API
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
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
          },
        );

        if (response.ok) {
          const savedPost = await response.json();
          setPosts([savedPost, ...posts]); // Add the new post to state
        } else {
          console.error('Failed to save the post');
        }
      } catch (error) {
        console.error('Error saving the post:', error);
      }

      // Clear form fields
      setTitle('');
      setContent('');
      setCategory('');
    }
  };

  return (
    <>
      <h1 className='text-3xl font-bold text-center mb-5 text-gray-100 mt-20'>
        Real Stories, Real Advice: Share Your Experience
      </h1>

      <div className='flex flex-col lg:flex-row items-start gap-8 px-6 lg:px-20 mb-14'>
        {/* Left side - Posts */}
        <div className='flex-1 space-y-6'>
          {posts.length === 0 ? (
            <p className='text-gray-400 text-center'>
              No posts yet. Share your experience!
            </p>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className='bg-gray-800 text-white shadow-lg rounded-xl p-8 border border-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out'
              >
                <h3 className='text-2xl font-bold text-gray-100 mb-2'>
                  {post.title}
                </h3>
                <p className='text-sm text-indigo-400 font-medium mb-6'>
                  {post.category}
                </p>
                <p className='text-gray-300 leading-relaxed mb-4'>
                  {post.content}
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-xs text-gray-500'>
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <button className='text-indigo-500 text-sm font-medium border border-indigo-100 rounded-full px-4 py-1 hover:bg-indigo-700 transition-colors'>
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right side - Form */}
        <div className='w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md'>
          <form className='space-y-4'>
            <input
              type='text'
              placeholder='Title of your story'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500'
            />
            <textarea
              placeholder='Write about your story...'
              value={content}
              onChange={e => setContent(e.target.value)}
              className='w-full p-3 h-32 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500'
            ></textarea>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className='block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
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

            <button
              onClick={handleSubmit}
              className='w-full bg-blue-500 hover:bg-blue-600 hover:text-white text-white font-semibold py-2 rounded-md focus:outline-none'
            >
              Post Experience
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Stories;
