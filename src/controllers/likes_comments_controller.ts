
import { Request, Response } from "express";

let likes: Record<number, number> = {};
let comments: Record<number, string[]> = {};

export const getLikes = (req: Request, res: Response) => {
  res.json(likes);
};

export const likePost = (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  if (!likes[postId]) {
    likes[postId] = 1;
  } else {
    likes[postId]++;
  }
  res.sendStatus(200);
};

export const getComments = (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const postComments = comments[postId] || [];
  res.json(postComments);
};

export const addComment = (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const { comment } = req.body;

  if (!comments[postId]) {
    comments[postId] = [comment];
  } else {
    comments[postId].push(comment);
  }
  res.sendStatus(200);
};

