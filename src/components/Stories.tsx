import React, { useState, useEffect } from 'react';
import BackToTopButton from './BackToTop';
import { PenLine, BookOpen, Tag, Send } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/stories/getposts',
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    setIsSubmitting(true);
    const newPost: Post = {
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
        setTitle('');
        setContent('');
        setCategory('');
        setSubmitMessage('Your story has been shared!');
        setTimeout(() => setSubmitMessage(''), 3000);
      } else {
        console.error('Failed to save the post');
      }
    } catch (error) {
      console.error('Error saving the post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='stories-root'>
      <div className='stories-orb-1' />
      <div className='stories-orb-2' />
      <BackToTopButton />

      {/* Page Header */}
      <div className='stories-hero'>
        <span className='section-label'>Community</span>
        <h1 className='stories-title'>Real Stories, Real Advice</h1>
        <p className='stories-subtitle'>
          Share your experience with GlassyUI and inspire the community. Every
          story matters.
        </p>
      </div>

      {/* Main Content */}
      <div className='stories-layout'>
        {/* Left — Posts Feed */}
        <div className='stories-feed'>
          {posts.length === 0 ? (
            <div className='stories-empty'>
              <BookOpen size={48} className='stories-empty-icon' />
              <p className='stories-empty-title'>No stories yet.</p>
              <p className='stories-empty-desc'>
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div key={index} className='stories-post-card'>
                <div className='stories-post-header'>
                  <h3 className='stories-post-title'>{post.title}</h3>
                  <span className='stories-post-date'>
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <div className='stories-post-category'>
                  <Tag size={13} />
                  <span>{post.category}</span>
                </div>
                <p className='stories-post-content'>{post.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Right — Submit Form */}
        <div className='stories-form-card'>
          <div className='stories-form-header'>
            <PenLine size={22} className='stories-form-icon' />
            <h2 className='stories-form-title'>Share Your Story</h2>
          </div>

          <form onSubmit={handleSubmit} className='stories-form'>
            <div className='stories-field'>
              <label className='stories-label'>Story Title</label>
              <input
                type='text'
                placeholder='Give your story a title...'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className='stories-input'
              />
            </div>

            <div className='stories-field'>
              <label className='stories-label'>Your Story</label>
              <textarea
                placeholder='Write about your experience with GlassyUI...'
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                rows={5}
                className='stories-textarea'
              />
            </div>

            <div className='stories-field'>
              <label className='stories-label'>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
                className='stories-select'
              >
                <option value='' disabled>
                  Select a category
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

            {submitMessage && (
              <p className='stories-success'>{submitMessage}</p>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className='stories-submit'
            >
              <Send size={16} />
              {isSubmitting ? 'Posting...' : 'Post Your Story'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Stories;
