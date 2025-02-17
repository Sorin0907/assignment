/**
 * Get the top position for the toggle indicator.
 * @param vertical If `true`, the top position will be calculated for a vertical toggle switch.
 * @param position The position of the toggle indicator.
 * @param optionCount The number of options in the toggle switch.
 * @returns The top position for the toggle indicator.
 */
export const getTopPosition = (
  vertical: boolean,
  position: number,
  optionCount: number
) => {
  if (vertical) {
    switch (position) {
      case 0:
        return "-2px";
      case optionCount - 1:
        return "4px";
      default:
        return "2px";
    }
  }
  return "-2px";
};
