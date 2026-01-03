import type { BaseEntity } from "../../../shared/types/base.types";

export interface UserRelation extends BaseEntity {
  userId: string;
  RelatedUserId: string;
  RelationName: string;
}

export interface UserRelationDtoForInsertion {
  RelatedUserId: string;
  RelationName: string;
}
