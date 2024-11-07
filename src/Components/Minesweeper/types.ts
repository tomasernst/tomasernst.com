export enum CellState {
    Hidden,
    Revealed,
    Flagged,
}
  
export interface Cell {
    state: CellState;
    hasMine: boolean;
    adjacentMines: number;
}
  