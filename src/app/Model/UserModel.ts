interface UserModel{
    userId: number;
    name: string;
    email: string;
    isActive: boolean;
    gender: string;
    genderId: number;
    createdDate: string;
    createdBy: number;
    updatedDate: string;
    updatedBy: number;
}

export default UserModel;