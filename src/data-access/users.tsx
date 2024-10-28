import "server-only"
import { cache } from 'react';

// """"""""""""""" DEMO CODE """""""""""""""
// Cached helper methods makes it easy to get the same value in many places
// without manually passing it around. This discourages passing it from Server
// Component to Server Component which minimizes risk of passing it to a Client
// Component.
export const getCurrentUser = cache(async () => {
    // Check auth and fetch current user from db
});