export interface PostRatingData {
  authorId: string;
  commentId?: string;
  folderId?: string;
  softwareId?: string;
  rating: number;
}

export interface PutRatingInEntityData {
  entityId: string;
  entityName: string;
  averageRating: number;
}
