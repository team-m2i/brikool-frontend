import {type TUser, userSchema} from "@/definitions/schema/user-schema";
import {type TUserModel, UserModelSchema} from "@/definitions/models/user-model-schema"

export const userModelToUser = (userModel: unknown): TUser | null => {
    if (!userModel) return null;
    const userModelCasted = userModel as TUserModel;
    const user: TUser = {
        id: userModelCasted.userId,
        name: `${userModelCasted.userFirstName} ${userModelCasted.userLastName}`,
        email: userModelCasted.userEmail
    };
    return UserModelSchema.safeParse(user).success ? user : null;
}

export const userToUserModel = (user: TUser): TUserModel | null => {
    if (!user) return null;
    const [firstName, ...lastNameParts] = user.name.split(' ');
    const userModel: TUserModel = {
        userId: user.id,
        userFirstName: firstName,
        userLastName: lastNameParts.join(' ') || '',
        userEmail: user.email
    };
    return userSchema.safeParse(userModel).success ? userModel : null;
}