import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: "📃 Not Started",
    tasks: [
      {
        id: uuidv4(),
        title: "task 1",
      },
      {
        id: uuidv4(),
        title: "task 2 ",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "🖊️ In Progress",
    tasks: [
      {
        id: uuidv4(),
        title: "task 3",
      },
      {
        id: uuidv4(),
        title: "task 4",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "✅ Completed",
    tasks: [
      {
        id: uuidv4(),
        title: "task 5",
      },
    ],
  },
];

export default mockData;
