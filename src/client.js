import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: '2d9i7120',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
    token: process.env.token
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);