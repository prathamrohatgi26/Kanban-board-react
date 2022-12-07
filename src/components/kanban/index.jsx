import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import mockData from "../../MockData";
import { useEffect, useState } from "react";
import Card from "../card";

const Kanban = () => {
  // initaition login
  // start wtih empty data set

  let parseF = async () => {
    let inData = localStorage.getItem("mockData");
    // inData = JSON.stringify(inData);
    console.log(typeof inData);
    inData = await JSON.parse(inData);

    let values = Object.entries(inData);
    console.log(inData);
    // inData = values;
    setData(inData);
    // console.log(typeof inData);
    // console.log(typeof mockData);
    console.log(values);
    console.log(inData);
    return;
  };

  const [data, setData] = useState(mockData);

  useEffect(() => {
    if (!localStorage.getItem("mockData")) {
      localStorage.setItem("mockData", JSON.stringify(mockData));
      setData(mockData);
    } else {
      parseF();
    }
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // console.log(source.droppableId, destination.droppableId);
    // console.log(destination);
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationcol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationcol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      // console.log(result);
      setData(data);
      localStorage.setItem("mockData", JSON.stringify(data));
    }
  };

  // window.localStorage.setItem("mockData", JSON.stringify(mockData));
  // var numb = document.getElementById("#tasks").array.length;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanban_section"
                ref={provided.innerRef}
              >
                <div className="kanban_section_title">
                  {section.title}-{section.tasks?.length}
                </div>
                <div className="kanban_section_content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          id="tasks"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <button className="addBtn">new +</button>
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default Kanban;
