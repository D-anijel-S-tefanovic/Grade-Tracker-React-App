import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export declare class CourseDetails {

  readonly id: string;
  readonly courseName: string;
  readonly courseGrade: string;
  readonly courseSemester: string;
  readonly courseRating: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CourseDetails>);
  static copyOf(source: CourseDetails, mutator: (draft: MutableModel<CourseDetails>) => MutableModel<CourseDetails> | void): CourseDetails;

}
