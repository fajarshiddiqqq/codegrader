import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { resolve } from '$app/paths';

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
        return json({ error: 'No file provided' }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a random short code for the URL
    const shortCode = Math.random().toString(36).substring(2, 8);
    const publishedUrl = resolve(`/s/${shortCode}`);

    return json({ 
        success: true, 
        url: publishedUrl 
    });
};