const PostRouter = require('express').Router();
const myCustomFilter = require('../middleware/MyCustomFilter')
const Post = require("../models/Post")
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage });


PostRouter.post("/post", myCustomFilter(), upload.single("img"),
  async (req, res) => {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        ok: false
      });

    } else {
      const { title, body, tags } = req.body;
      const img = req.file.filename;
      const user_id = req.token._id;
      const post = await Post.create({
        author: user_id,
        title,
        body,
        tags,
        img
      })
      console.log('file received');
      return res.json({
        ok: true
      })
    }

  });

PostRouter.get("/post", async (req, res) => {
  const postList = await Post.find()
    .populate("author", ["username"])
    .sort({ created_at: -1 })
    .limit(5)
  res.json(postList);
});

PostRouter.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("author", ["username"]);
    res.json(post)
  } catch (err) {
    res.json({
      ok: false,
      message: "El post no existe =("
    });
  }
});

PostRouter.patch("/post/:postId", myCustomFilter(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const { body } = req.body;
    post.body = body;
    await post.save();
    res.json({
      ok: true,
    })
  } catch (err) {
    res.json({
      ok: false,
      error: err.message,
    });
  }
})


module.exports = PostRouter;