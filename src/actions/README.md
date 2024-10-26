## Definition
Next.js server actions are API routes that handle server-side logic. These actions are defined in the src/actions folder and are used to perform operations such as saving user data, handling authentication, etc.

For more information about Next.js API routes, check the [official documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### Description
This folder contains subfolders named after the entities that the app will have. Each entity will have subfiles that contain the server actions for that entity. For example, the `admin` entity will have `manage-users-actions`, `handles-reports-actions` etc ..


### Notice:
Do not include fetching data in server actions: getCurrentUser, getReport, getusersAll etc .. instead refer to DAL located at `/src/data-access` [click here](../data-access/README.md)

### for example:
- `admin/manage-users-actions` will have the actions: deleteUserAction, lockUserAction, unlockUserAction etc ..
- `admin/handles-reports-actions` will have the actions: addReportAction, handleReportAction, deleteReportAction, etc ..
- `common/handles-auth-actions` will have the signInAction, signUpAction actions that are available for all users