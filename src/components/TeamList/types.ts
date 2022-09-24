import { User } from "models/User";
import { SortType, ViewType } from "pages/types";

export interface UserItemProps {
  user: User;
  viewType: ViewType;
}

export interface InviteModalProps {
  open: boolean;
  onCancel: () => void;
}

export interface TeamListProps {
  viewType: ViewType;
  sortType: SortType;
  search: string;
}
