/**
 * Get the border radius for the toggle switch.
 * @param vertical If `true`, the border radius will be calculated for a vertical toggle switch.
 * @param position The position of the toggle indicator.
 * @param optionCount The number of options in the toggle switch.
 * @returns The border radius for the toggle switch.
 */
export const getBorderRadius = (
  vertical: boolean,
  position: number,
  optionCount: number
) => {
  if (vertical) {
    switch (position) {
      case 0:
        return "40px 40px 0 0";
      case optionCount - 1:
        return "0 0 40px 40px";
      default:
        return "0";
    }
  }
  return "40px";
};
