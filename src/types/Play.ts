export type Play = {
  play: {
    steps: {
      elements: {
        id: string;
        x: number;
        y: number;
        elementType: ElementType;
      }[];
    }[];
  }[];
};

enum ElementType {
  BALL = "BALL",
  PLAYER = "PLAYER",
}
