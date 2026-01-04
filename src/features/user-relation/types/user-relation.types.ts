import type { BaseEntity } from "../../../shared/types/base.types";

export interface UserRelation extends BaseEntity {
  userId: string;
  relatedUserId: string;
  relationName: string;
}

export interface UserRelationDtoForInsertion {
  relatedUserId: string;
  relationName: string;
}
