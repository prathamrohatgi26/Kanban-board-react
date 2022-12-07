import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: <span> ⭕ Not Started </span>,
    tasks: [
      {
        id: uuidv4(),
        title: "task 1",
      },
      {
        id: uuidv4(),
        title: "task 2",
      },
    ],
  },
  {
    id: uuidv4(),
    title: <span>🖊️ In Progress </span>,
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
    title: <span>✅ Completed </span>,
    tasks: [
      {
        id: uuidv4(),
        title: "task 5",
      },
    ],
  },
];

export default mockData;
