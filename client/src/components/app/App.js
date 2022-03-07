import React from "react"
import TrelloList from "../trelloList/trelloList"
import Sidebar from "../sidebar/sidebar"
import { useSelector } from 'react-redux'
import TrelloActionButton from "../TrelloActionButton/TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { sort } from "../../actions/actions"
import styled from "styled-components"
import './App.css';

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: rgb(0, 0, 0);
    margin-top: 5rem;
  `;

function App() {
  const dispatch = useDispatch();
  const lists = useSelector(state => {
    const { listsReducer } = state;
    console.log(listsReducer.lists)
    return listsReducer.lists
  })

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    console.log(destination, source, draggableId, type)
    if (!destination) return;

    dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              <Sidebar />
              {lists.map((list, index) =>
                <TrelloList
                  _id={list.listId}
                  key={list.listId}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              )}
              {provided.placeholder}
              <TrelloActionButton list />
            </ListContainer>
          )}
        </Droppable>
    </DragDropContext>
  )
}


export default App;
