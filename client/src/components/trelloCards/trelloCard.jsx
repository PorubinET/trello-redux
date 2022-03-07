import { useState, React } from "react";
import { useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components"
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { cardText } from "../../actions/actions"
import "./trelloCard.scss"

const CardContainer = styled.div`
  margin-bottom: 8px;
`

const TrelloCard = ({ text, id, index, listId }) => {
  let [textCard, setTextCards] = useState(text);
  let [styleCard, setCardStyle] = useState(true);
  const dispatch = useDispatch();

  const changeText = (e) => {
    setTextCards(textCard = e.target.value)
  }

  const changeStyle = () => {
    setCardStyle(styleCard === true ? false : true)
  }

  const removeStyle = () => {
    setCardStyle(styleCard = true)
  }
  
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.currentTarget.setAttribute("readonly", "true")
      dispatch(cardText(id, listId, textCard))
    }
  }

  // scss
  let style = styleCard ? "card__text" : "card__text--style"

  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Grid>
              <CardContent className="card__content">
                <Typography>
                  <input className={style}
                    type="text"
                    id={id}
                    value={textCard}
                    readOnly={styleCard}
                    onKeyDown={handleKeyDown}
                    onChange={changeText}
                    onBlur={removeStyle}
                  />
                </Typography>
                <div
                  onClick={changeStyle}
                  onBlur={removeStyle}
                >
                  <EditIcon className="card__icon"
                  />
                </div>

              </CardContent>
            </Grid>
          </Card>
        </CardContainer>
      )}
    </Draggable>

  );
};




export default TrelloCard;