import * as contentstack from 'contentstack';

const Stack = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY!,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
});

export default Stack;

export const fetchBlogs = async () => {
  try {
    const result = await Stack.ContentType('blog')
      .Query()
      .limit(3) 
      .toJSON()
      .find();

    return result[0];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }}