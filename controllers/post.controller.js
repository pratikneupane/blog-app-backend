const Post = require('../models/posts.model.js');

exports.createPost = async (req, res) => {
    const { title, body } = req.body;
    try {
        console.log(req);
        const post = new Post({
            title,
            body,
            author: req.user
        });
        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
}

exports.updatePost = async (req, res) => {
    const { title, body } = req.body;
    // Build post object
    const postFields = {};
    if (title) postFields.title = title;
    if (body) postFields.body = body;

    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        // Make sure user owns post
        if (post.author.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: postFields },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        // Make sure user owns post
        if (post.author.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Post.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
