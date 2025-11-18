// +page.server.ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
    publish: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return fail(400, { error: 'No file provided' });
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate a random short code for the URL
        const shortCode = Math.random().toString(36).substring(2, 8);
        const publishedUrl = `${import.meta.env.VITE_APP_URL}/s/${shortCode}`;

        // Return clean object (don't double-stringify)
        return { 
            success: true, 
            url: publishedUrl 
        };
    }
} satisfies Actions;