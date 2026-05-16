import React, { useState, useEffect } from 'react';
import { Share2, MessageSquare, Calendar, Tag, Send } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

const DEFAULT_POSTS: Post[] = [
  {
    id: '1',
    title: 'My First Glassy Project',
    content:
      'Implementing glassmorphism was never this easy. The components are truly stunning!',
    category: 'GlassyUI Introduction',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Customizing the Theme',
    content:
      'I managed to create a unique brand identity by slightly tweaking the glassy gradients.',
    category: 'Customizing GlassyUI Components',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

const Stories: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      // 1. Try to fetch from backend (optional)
      try {
        const response = await fetch(
          'http://localhost:5000/api/stories/getposts',
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPosts(data);
            return;
          }
        }
      } catch (error) {
        console.warn('Backend not available, falling back to local storage.');
      }

      // 2. Fallback to localStorage
      const localPosts = localStorage.getItem('glassyui_stories');
      if (localPosts) {
        setPosts(JSON.parse(localPosts));
      } else {
        setPosts(DEFAULT_POSTS);
      }
    };

    loadPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      content,
      category,
      date: new Date().toISOString(),
    };

    // 1. Update UI and Local Storage immediately (Optimistic Update)
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('glassyui_stories', JSON.stringify(updatedPosts));

    // 2. Try to sync with backend
    try {
      await fetch('http://localhost:5000/api/stories/saveposts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
    } catch (error) {
      console.warn('Failed to sync with backend, saved locally.');
    } finally {
      setIsLoading(false);
      setTitle('');
      setContent('');
      setCategory('');
    }
  };

  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedPosts(newExpanded);
  };

  const handleShare = async (post: Post) => {
    const shareData = {
      title: `GlassyUI Story: ${post.title}`,
      text: post.content,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\nRead more at: ${shareData.url}`,
        );
        alert('Story details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className='min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
      <div className='max-w-7xl mx-auto'>
        <header className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md'>
            Real Stories, <span className='text-blue-400'>Real Advice</span>
          </h1>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
            Share your experience with GlassyUI and inspire others in the
            community.
          </p>
        </header>

        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Stories Feed */}
          <div className='flex-1 space-y-8'>
            {posts.length === 0 ? (
              <div className='text-center py-20 rounded-2xl border-2 border-dashed border-gray-700'>
                <MessageSquare className='mx-auto h-12 w-12 text-gray-600 mb-4' />
                <p className='text-gray-500 text-xl font-medium'>
                  No stories shared yet.
                </p>
                <p className='text-gray-600'>
                  Be the first to share your journey!
                </p>
              </div>
            ) : (
              posts.map(post => {
                const isExpanded = expandedPosts.has(post.id);
                const shouldTruncate = post.content.length > 150;
                const displayedContent =
                  isExpanded || !shouldTruncate
                    ? post.content
                    : `${post.content.substring(0, 150)}...`;

                return (
                  <div
                    key={post.id}
                    className='group relative backdrop-filter backdrop-blur-lg bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-8 transition-all duration-300 hover:bg-opacity-10 hover:shadow-2xl hover:-translate-y-1'
                  >
                    <div className='flex justify-between items-start mb-4'>
                      <span className='px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-400 bg-opacity-10 rounded-full border border-blue-400 border-opacity-20 flex items-center gap-2'>
                        <Tag size={12} /> {post.category}
                      </span>
                      <span className='text-sm text-gray-500 flex items-center gap-1'>
                        <Calendar size={14} />{' '}
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className='text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors'>
                      {post.title}
                    </h3>
                    <p className='text-gray-300 leading-relaxed mb-6'>
                      {displayedContent}
                    </p>
                    <div className='pt-6 border-t border-white border-opacity-10 flex items-center justify-between'>
                      {shouldTruncate && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className='text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors flex items-center gap-2'
                        >
                          {isExpanded ? 'Read less' : 'Read more...'}
                        </button>
                      )}
                      {!shouldTruncate && <div />}
                      <button
                        onClick={() => handleShare(post)}
                        className='text-gray-500 hover:text-white transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-full'
                        title='Share story'
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Share Form */}
          <div className='w-full lg:w-96 shrink-0'>
            <div className='sticky top-28 backdrop-filter backdrop-blur-xl bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl p-8 shadow-xl'>
              <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-2'>
                <Share2 className='text-blue-400' /> Share Yours
              </h2>
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1.5'>
                    Title
                  </label>
                  <input
                    type='text'
                    placeholder='Capture the essence...'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className='w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-10 transition-all'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1.5'>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-10 transition-all appearance-none'
                  >
                    <option value='' disabled className='bg-gray-900'>
                      Select Category
                    </option>
                    <option
                      value='GlassyUI Introduction'
                      className='bg-gray-900'
                    >
                      GlassyUI Introduction
                    </option>
                    <option
                      value='Customizing Components'
                      className='bg-gray-900'
                    >
                      Customizing Components
                    </option>
                    <option value='Advanced Techniques' className='bg-gray-900'>
                      Advanced Techniques
                    </option>
                    <option value='Best Practices' className='bg-gray-900'>
                      Best Practices
                    </option>
                    <option value='Contributing' className='bg-gray-900'>
                      Contributing
                    </option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1.5'>
                    Your Journey
                  </label>
                  <textarea
                    placeholder='Write about your experience...'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className='w-full px-4 py-3 h-40 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-10 transition-all resize-none'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                    isLoading
                      ? 'bg-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/20'
                  }`}
                >
                  {isLoading ? (
                    'Posting...'
                  ) : (
                    <>
                      <Send size={18} /> Post Experience
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
