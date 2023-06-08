import { firstSection } from './firstSection';
import { secondSection } from './secondSection';

type LessonStructure = {
  description: string;
  task: string;
  command: string;
};

export type Lesson = {
  id: number;
  sectionTitle: string;
  lessonTitle: string;
  lessonType: string;
  lessonStructure: LessonStructure[];
  lessonPlan: string[];
};

export const sections = [
  { title: 'Раздел первый – Основы Bash', content: firstSection },
  { title: 'Раздел второй – Навигация и пути', content: secondSection },
  //   Навигация по системе ?
];
