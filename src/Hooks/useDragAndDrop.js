import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IsArrayEqual } from '@/Utils/IsEqual';

export const useDragAndDrop = ({ initialItems = [], onReorder, addOrderKey = true }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setItems(prev => {
    if (!IsArrayEqual(prev, initialItems)) {
      return initialItems;
    }
    return prev;
  });
}, [initialItems]);

  // if (!items || items.length === 0) {
  //   return;
  // }

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = [...items];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    let updatedItems = reordered;
    if (addOrderKey) {
      // Add order key to each item if required
      updatedItems = reordered.map((item, index) => (typeof item === 'object' && item !== null ? { ...item, order: index + 1 } : item));
    }

    setItems(updatedItems);

    try {
      setLoading(true);
      if (onReorder) {
        await onReorder(movedItem, result.destination.index, updatedItems);
      }
    } catch (error) {
      console.error('Drag reorder failed', error);
    } finally {
      setLoading(false);
    }
  };

  return { items, setItems, handleDragEnd, loading };
};

const DragAndDropWrapper = ({
  items,
  handleDragEnd,
  getKey = (item) => item._id,
  children, // must be a function: (item, index, dragProps) => JSX
  droppableId = 'droppable-list',
  className = '',
}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={className}>
            {items.map((item, index) => (
              <Draggable key={getKey(item)} draggableId={getKey(item)} index={index}>
                {(provided, snapshot) => children(item, index, { provided, snapshot })}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropWrapper;
