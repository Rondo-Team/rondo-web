import { FieldElementType } from "./FieldElementType";

export type PlayElement = {
  id: string;
  elementType: FieldElementType;
  x: number;
  y: number;
};

export type PlayStep = {
  elements: PlayElement[];
};

export type Play = {
  steps: PlayStep[];
};
