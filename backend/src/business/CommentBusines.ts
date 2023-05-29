import { CommentDatabase } from "../database/CommentDataBase";
import { CreateCommentInputDTO } from "../dtos/comments/CreateCommentDTO";
import { GetCommentsInputDTO } from "../dtos/comments/GetCommentsDTO";
import { LikeCommentInputDTO } from "../dtos/comments/LikeCommentDTO";
import { LikePostInputDTO } from "../dtos/posts/LikePostDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { CommentDB } from "../models/Comments";
import { Comment } from "../models/Comments";
import { UserDB } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
  constructor(
    private commentDatabase: CommentDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getCommentsByPostId = async (input: GetCommentsInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [comments, users] = await this.commentDatabase.getCommentsByPostId(
      input
    );

    const commentsWithUserName = comments.map((comment) => {
      const userOfThisComment: UserDB[] = users.filter((user) => {
        return comment.user_id === user.id;
      });

      return { ...comment, name: userOfThisComment[0].name };
    });

    console.log(commentsWithUserName);
    return commentsWithUserName;
  };

  public createComment = async (input: CreateCommentInputDTO) => {
    const { token, postId, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generate();

    const newComment = new Comment(
      id,
      postId,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newCommentDB: CommentDB = {
      id: newComment.getId(),
      post_id: newComment.getPostId(),
      user_id: newComment.getUserId(),
      content: newComment.getContent(),
      likes: newComment.getLikes(),
      dislikes: newComment.getDislikes(),
      created_at: newComment.getCreatedAt(),
      updated_at: newComment.getUpdatedAt(),
    };

    this.commentDatabase.createComment(newCommentDB);
  };

  public likeComment = async (input: LikeCommentInputDTO) => {
    const { id, postId, token, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [comments] = await this.commentDatabase.getCommentsByPostId({
      postId,
    });

    const [commentDB] = comments.filter((comment: CommentDB) => {
      return comment.id === id;
    });

    if (commentDB) {
      const [isYourComment] = comments.filter((comment: CommentDB) => {
        return comment.id === id && comment.user_id === payload.id;
      });

      console.log(isYourComment);

      if (isYourComment) {
        throw new BadRequestError(
          "Não é possível dar like ou dislike no próprio comentário"
        );
      }
    }

    if (!commentDB) {
      throw new BadRequestError("Não existe nenhum comentário com esse id");
    }

    let isLiked = await this.commentDatabase.verifyLike(id, payload.id);
    let likesNumber = commentDB.likes;
    let dislikesNumber = commentDB.dislikes;

    if (like) {
      if (isLiked === 1) {
        likesNumber = commentDB.likes - 1;
        isLiked = 3;
      }

      if (isLiked === 0) {
        likesNumber = commentDB.likes + 1;
        dislikesNumber = commentDB.dislikes - 1;
        isLiked = 1;
      } else if (isLiked === 2) {
        likesNumber = commentDB.likes + 1;
        isLiked = 1;
      }
      await this.commentDatabase.likeComment(
        likesNumber,
        dislikesNumber,
        id,
        payload.id,
        isLiked
      );

      return isLiked;
    } else if (!like) {
      if (isLiked === 0) {
        dislikesNumber = commentDB.dislikes - 1;
        isLiked = 3;
      }

      if (isLiked === 1) {
        likesNumber = commentDB.likes - 1;
        dislikesNumber = commentDB.dislikes + 1;
        isLiked = 0;
      } else if (isLiked === 2) {
        likesNumber = 0;
        dislikesNumber = commentDB.dislikes + 1;
        isLiked = 0;
      }

      await this.commentDatabase.dislikeComment(
        likesNumber,
        dislikesNumber,
        id,
        payload.id,
        isLiked
      );

      return isLiked;
    }
  };

  public verifyLike = async (input: LikePostInputDTO) => {
    const { id, token } = input;

    const payload = this.tokenManager.getPayload(token);

    console.log(payload);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const likeSituation = await this.commentDatabase.verifyLike(id, payload.id);

    return likeSituation;
  };
}
