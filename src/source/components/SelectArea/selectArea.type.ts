export interface Point {
  x: number;
  y: number;
}

export interface SelectAreaProps {
  startPoint: Point;
  endPoint: Point;
}
export interface SelectAreaInstance extends SelectAreaProps {
  $el: HTMLElement;
}
