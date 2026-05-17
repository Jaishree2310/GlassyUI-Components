import Post from '../model/postModel.js';

const MAX_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 20;

export const getPosts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_PAGE_SIZE),
    );
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find().sort({ date: -1 }).skip(skip).limit(limit).lean(),
      Post.countDocuments(),
    ]);

    res.status(200).json({
      posts,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts.' });
  }
};

export const savePost = async (req, res) => {
  const storiesKey = process.env.STORIES_API_KEY;
  if (storiesKey) {
    const provided = req.headers['x-stories-api-key'];
    if (provided !== storiesKey) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
  }

  const { title, content, category, date } = req.body;

  if (!title?.trim() || !content?.trim() || !category?.trim()) {
    return res
      .status(400)
      .json({ message: 'Title, content, and category are required.' });
  }

  try {
    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),
      date: date ? new Date(date) : new Date(),
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Error saving post.' });
  }
};
