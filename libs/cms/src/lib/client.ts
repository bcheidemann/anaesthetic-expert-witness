import { createClient } from 'next-sanity';
import { projectId } from './constants';

export const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false
});
