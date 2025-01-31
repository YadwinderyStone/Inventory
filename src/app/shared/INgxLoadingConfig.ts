export interface INgxLoadingConfig {
  backdropBorderRadius?: string;
  backdropBackgroundColour?: string;
  fullScreenBackdrop?: boolean;
  animationType?: string;
  primaryColour?: string;
  secondaryColour?: string;
  tertiaryColour?: string;
  [key: string]: string | boolean | undefined;
}
export declare class NgxLoadingConfig implements INgxLoadingConfig {
  backdropBorderRadius?: string;
  backdropBackgroundColour?: string;
  fullScreenBackdrop?: boolean;
  animationType?: string;
  primaryColour?: string;
  secondaryColour?: string;
  tertiaryColour?: string;
  [key: string]: string | boolean | undefined;
  constructor(config?: INgxLoadingConfig);
}
export declare const ngxLoadingAnimationTypes: {
  chasingDots: string;
  circle: string;
  circleSwish: string;
  cubeGrid: string;
  doubleBounce: string;
  none: string;
  pulse: string;
  rectangleBounce: string;
  rotatingPlane: string;
  threeBounce: string;
  wanderingCubes: string;
};
