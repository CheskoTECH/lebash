import { create } from 'zustand';

type TestAnswer = {
  id: number;
  answers: string[];
};

interface LeBashStore {
  lessonInfo: any;
  currentSection: number;
  currentLesson: number;
  nextSection: number;
  nextLesson: number;
  doneLessons: number[];
  commands: string[];
  testAnswers: TestAnswer[];
  testQuestion: number;
  localTestAnswers: string[];
  currentAnswer: string;
  setlessonInfo: (newLessonInfo: any) => void;
  setDoneLessons: (lesson: number) => void;
  setCurrentLesson: (lesson: number) => void;
  setCurrentSection: (section: number) => void;
  setNextLesson: (lesson: number) => void;
  setNextSection: (section: number) => void;
  setCommands: (command: string) => void;
  setTestAnswers: (answer: TestAnswer) => void;
  removeTestAnswer: (id: number) => void;
  dropCommands: () => void;
  setTestQuestion: (question: number) => void;
  setLocalTestAnswers: (answers: string[]) => void;
  setCurrentAnswer: (answer: string) => void;
}

export const useStore = create<LeBashStore>((set, get) => ({
  lessonInfo: '',
  currentSection: 0,
  currentLesson: 0,
  nextSection: 0,
  nextLesson: 0,
  doneLessons: [],
  commands: [],
  testAnswers: [],
  testQuestion: 0,
  localTestAnswers: [],
  currentAnswer: '',
  setlessonInfo: (newLessonInfo) => {
    set((state) => ({
      ...state,
      lessonInfo: newLessonInfo,
    }));
  },
  setCommands: (command: string) => {
    set((state) => ({
      ...state,
      commands: [...state.commands, command],
    }));
    console.log('command: ', command);
  },
  dropCommands: () => {
    set((state) => ({
      ...state,
      commands: [],
    }));
  },
  setDoneLessons: (lesson: number) => {
    set((state) => ({
      ...state,
      doneLessons: [...state.doneLessons, lesson],
    }));
    console.log('lesson: ', lesson);
  },
  setCurrentSection: (section: number) => {
    set((state) => ({
      ...state,
      currentSection: section,
    }));
  },
  setCurrentLesson: (lesson: number) => {
    set((state) => ({
      ...state,
      currentLesson: lesson,
    }));
  },
  setNextLesson: (lesson: number) => {
    set((state) => ({
      ...state,
      nextLesson: lesson,
    }));
  },
  setNextSection: (section: number) => {
    set((state) => ({
      ...state,
      nextSection: section,
    }));
  },
  setTestAnswers: (answer: TestAnswer) => {
    set((state) => ({
      ...state,
      testAnswers: [...state.testAnswers, answer],
    }));
  },
  removeTestAnswer: (id: number) => {
    set((state) => ({
      ...state,
      testAnswers: [...state.testAnswers.filter((answer) => answer.id !== id)],
    }));
  },
  setTestQuestion: (question: number) => {
    set((state) => ({
      ...state,
      testQuestion: question,
    }));
  },
  setLocalTestAnswers: (answer: string[]) => {
    set((state) => ({
      ...state,
      localTestAnswers: answer,
    }));
  },
  setCurrentAnswer: (answer: string) => {
    set((state) => ({
      ...state,
      currentAnswer: answer,
    }));
  },
}));

// export const useToDoStore = create<ToDoStore>((set, get) => ({
//     tasks: [],
//     tasksDone: [],
//     createTask: (title) => {
//         const { tasks } = get();
//         const newTask = {
//             id: generateId(),
//             title,
//             createdAt: Date.now(),
//         }

//         set({
//             tasks: [newTask].concat(tasks),
//         })
//     },
//     updateTask: (id: string, title: string) => {
//         const { tasks } = get();
//         set({
//             tasks: tasks.map((task) => ({
//                 ...task,
//                 title: task.id === id ? title : task.title,
//             }))
//         });
//     },
//     removeTask: (id: string) => {
//         const { tasks, tasksDone } = get();
//         set({
//             tasks: tasks.filter((task) => task.id !== id),
//             tasksDone: [...tasksDone].concat(tasks.filter((task) => task.id === id)),
//         });
//     },
//     createTaskDone: () => {
//         const { tasksDone } = get();
//         const newTask = {
//             id: generateId(),
//             title: 'Fake repeated title',
//             createdAt: Date.now(),
//         }

//         set({
//             tasksDone: [newTask].concat(tasksDone),
//         })
//     },
//     deleteEverything: () => {
//         set({}, true)
//     },
// }));
