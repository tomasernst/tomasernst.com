import { CellState, Cell } from './types';

interface CellProps {
  cell: Cell;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CellComponent: React.FC<CellProps> = ({ cell, onClick, onRightClick }) => {
  let content = '';
  let className = 'minesweeper-cell';

  if (cell.state === CellState.Revealed) {
    className += ' revealed';
    if (cell.hasMine) {
      content = '💣';
    } else if (cell.adjacentMines > 0) {
      content = cell.adjacentMines.toString();
      className += ` number-${cell.adjacentMines}`; // Add class based on adjacent mines
    }
  } else if (cell.state === CellState.Flagged) {
    content = '🚩';
  }

  return (
    <div
      className={className}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {content}
    </div>
  );
};

export default CellComponent;