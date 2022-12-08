import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import mockData from "../../MockData";
import { useEffect, useState } from "react";
import Card from "../card";
import { v4 as uuidv4 } from "uuid";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";

const Kanban = () => {
  const [data, setData] = useState(mockData);

  //create new item
  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      // const newValue = () => {
      let entry = document.getElementById("inputValue").value;
      let old = JSON.parse(localStorage.getItem("mockData")) || [];
      // console.log(old);
      // console.log(data);

      const currentTask = {
        id: uuidv4(),
        title: entry,
      };

      if (mockData[0].id === "todo") {
        mockData[0].tasks.push(currentTask);
      } else if (mockData[1].id === "started") {
        mockData[1].tasks.push(currentTask);
      } else if (mockData[2].id === "comp") {
        mockData[2].tasks.push(currentTask);
      }

      setData(old);
      localStorage.setItem("mockData", JSON.stringify(old));

      // console.log(mockData[1].tasks);
      // console.log(mockData[0].id);

      return;
      // };
    }
  };
  // initaition login
  // start wtih empty data set

  let parseF = async () => {
    let inData = localStorage.getItem("mockData");
    // inData = JSON.stringify(inData);
    // console.log(typeof inData);
    inData = await JSON.parse(inData);

    // let values = Object.entries(inData);
    // console.log(inData);
    // inData = values;
    setData(inData);
    // console.log(typeof inData);
    // console.log(typeof mockData);
    // console.log(values);
    // console.log(inData);
    return;
  };

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

  // function BackdropExample() {
  //   const OverlayTwo = () => (
  //     <ModalOverlay
  //       bg="none"
  //       backdropFilter="auto"
  //       backdropInvert="80%"
  //       backdropBlur="2px"
  //     />
  //   );
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [overlay, setOverlay] = useState();

  //   return (
  //     <>
  //       <Button
  //         ml="4"
  //         onClick={() => {
  //           setOverlay(<OverlayTwo />);
  //           onOpen();
  //         }}
  //       >
  //         Use Overlay two
  //       </Button>
  //       <Modal isCentered isOpen={isOpen} onClose={onClose}>
  //         {overlay}
  //         <ModalContent>
  //           <ModalHeader>Modal Title</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <Text>Custom backdrop filters!</Text>
  //           </ModalBody>
  //           <ModalFooter>
  //             <Button onClick={onClose}>Close</Button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     </>
  //   );
  // }

  // window.localStorage.setItem("mockData", JSON.stringify(mockData));
  // var numb = document.getElementById("#tasks").array.length;

  // function VerticallyCenter() {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  //   return (
  //     <>
  //       <Button onClick={onOpen}>Trigger modal</Button>

  //       <Modal onClose={onClose} isOpen={isOpen} isCentered>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>{tasks.title}</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody></ModalBody>
  //           <ModalFooter>
  //             <Button onClick={onClose}>Close</Button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     </>
  //   );
  // }

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
                          <Card onClick={task}>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <input
                    id="inputValue"
                    placeholder="New+"
                    onKeyUp={handleKeyPress}
                  ></input>
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
