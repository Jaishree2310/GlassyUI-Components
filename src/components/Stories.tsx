import React, { useState, useEffect } from 'react';

interface Post {
  title: string;
  content: string;
  category: string;
  date: string;
}

const Stories: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/stories/getposts`,
        );
        if (
          response.ok &&
          response.headers.get('Content-Type')?.includes('application/json')
        ) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    const newPost = {
      title,
      content,
      category,
      date: new Date().toISOString(),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/stories/saveposts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost),
        },
      );
      if (response.ok) {
        const saved = await response.json();
        setPosts([saved, ...posts]);
        setTitle('');
        setContent('');
        setCategory('');
      }
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  return (
    <div className='relative min-h-screen bg-[#03010f] text-white overflow-x-hidden'>
      <style>{`.stories-select option{background: #0f172a; color: #e6eef8;}`}</style>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.24),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.14),transparent_30%)]' />
      <div className='pointer-events-none absolute -left-36 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl' />
      <div className='pointer-events-none absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl' />

      <div className='relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-8 max-w-3xl text-center'>
          <span className='glassmorphism inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80'>
            <span className='h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]' />
            Community Stories
          </span>
          <h1 className='mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl'>
            Real Stories, Real Advice
          </h1>
          <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg'>
            Share your experience with GlassyUI and read how others are using
            the library in real projects.
          </p>
        </div>

        {posts.length === 0 && (
          <p className='mb-6 text-center text-slate-400'>
            No posts yet. Share your experience!
          </p>
        )}

        <div
          className={
            posts.length === 0
              ? 'mx-auto flex max-w-2xl justify-center'
              : 'flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center'
          }
        >
          <div
            className={`space-y-6 ${posts.length === 0 ? 'hidden' : 'flex-1'}`}
          >
            {posts.length > 0 &&
              posts.map(post => (
                <article
                  key={post.title + post.date}
                  className='glassmorphism rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-8'
                >
                  <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
                    <p className='inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100'>
                      {post.category}
                    </p>
                    <p className='text-xs text-slate-400'>
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                  <h3 className='text-2xl font-semibold text-white'>
                    {post.title}
                  </h3>
                  <p className='mt-4 leading-7 text-slate-300'>
                    {post.content}
                  </p>
                  <div className='mt-6 flex justify-end'>
                    <button
                      type='button'
                      className='rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/20'
                    >
                      Read More
                    </button>
                  </div>
                </article>
              ))}
          </div>

          <div
            className={`glassmorphism w-full rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.4)] backdrop-blur-xl ${posts.length === 0 ? 'mx-auto max-w-xl' : 'lg:sticky lg:top-24 lg:w-[420px] lg:mx-auto'}`}
          >
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-200'>
                  Story title
                </label>
                <input
                  type='text'
                  placeholder='Title of your story'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className='w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition-colors duration-300 focus:border-cyan-300/50 focus:bg-white/15'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-slate-200'>
                  Your story
                </label>
                <textarea
                  placeholder='Write about your story...'
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className='h-36 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition-colors duration-300 focus:border-cyan-300/50 focus:bg-white/15'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-slate-200'>
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className='stories-select block w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50 focus:bg-white/15'
                >
                  <option value='' disabled className='bg-slate-950'>
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
                className='w-full rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(34,211,238,0.25)] transition-transform duration-300 hover:-translate-y-0.5'
              >
                Post Experience
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
