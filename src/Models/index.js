// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { CourseDetails } = initSchema(schema);

export { CourseDetails };
