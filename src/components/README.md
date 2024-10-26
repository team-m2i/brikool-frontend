## Description
Shared components folder, contains all the shared components that are used in multiple pages.

### Notice
Before you add a component here <br>
<b>make sure this component does not behold crucial code such as `admin-action`, `database-update`, `fetch-sensitive-data` so that the other users do not import it in a `public page` or `non permitted path`(doesn't have the role)</b>.<br/>
Instead move this component to for example: `src/app/[locale]/dashboard/@admin/_components` for admin dashboard specific components.