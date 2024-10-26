## Description
This folder (data-access-layer) contains crucial code that handles sensitive critical logic that interchanges directly with the Spring Boot backend server. It may have some security functions like login-status check, CRUD requests, role check, etc. 
it uses DTO (Data Transfer Object) to transfer data between the client and the server.

Example for possible files:
- [`users.ts`](users.tsx): getCurrentUser, getUsersAll, getUserById, deleteUser, etc.
- `reports.ts`: getReportsAll, getReportById, deleteReport, handleReport, etc.