const { verify } = require("./middleware");

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Post } = require("../models");

router.get("/", async (req, res) => {
  const data = await Post.findAll();
  res.status(200).json({ success: true, data });
});

router.post("/", async (req, res, next) => {
  const { data } = req.body;
  const post = await Post.create({ content: data });
  res.status(201).json({ success: true, data: post });
});

router.patch("/:postId", async (req, res) => {
  const { data } = req.body;
  const post = await Post.findOne({
    where: {
      id: req.params.postId,
    },
  });

  if (!post) {
    res.status(403).send("게시물이 존재 하지 않습니다.");
  }
  post.content = data;
  await post.save();

  res.status(200).json({ success: true });
});

router.delete("/:postId", async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.postId } });

  if (!post) {
    return res.status(403).send("게시물이 존재 하지 않습니다.");
  }
  await post.destroy();
  res.status(201).json({ success: true });
});

// 게시물 조회 후 토큰 발급
router.get("/:postId/token", async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOne({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return res.status(403).send("게시물이 존재 하지 않습니다.");
  }

  const token = jwt.sign({ content: post.content }, process.env.JWT_SECRET, {
    expiresIn: "30m",
    issuer: "huynjin",
  });
  res.status(200).json({
    message: "토큰이 발급됐습니다.",
    token,
  });
});

// 토큰 검증 tests
router.get("/test", verify, (req, res) => {
  console.log("test", req.decoded);
  res.status(200).send("토큰 유효 테스트 정상");
});

module.exports = router;
