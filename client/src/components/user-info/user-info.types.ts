import { User } from "../../redux/user/user.types";

export interface UserInfoProps {
    currentUser: User;
    show: boolean;
    handleClose: () => void;
}