import type { BaseEntity } from "../../../shared/types/base.types";

export interface Oopsie extends BaseEntity {
  ownerUserId:string;
  parentGroupId:string;
  text: string;
  isCompleted: boolean;
}
