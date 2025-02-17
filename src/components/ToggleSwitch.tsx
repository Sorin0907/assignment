import { getBorderRadius } from "../utils/get-border-radius";
import { getTopPosition } from "../utils/get-top-position";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

type ToggleSwitchProps = {
  /**
   * The ID of the toggle switch.
   */
  id: string;
  /**
   * The index of the selected option.
   */
  selected: number;
  /**
   * The function to call when the selected option changes.
   */
  onChange: (value: number) => void;
  /**
   * An array of options to display in the toggle switch.
   */
  options: [string, string] | [string, string, string];
  /**
   * If `true`, the toggle switch will be disabled.
   */
  disabled?: boolean;
  /**
   * The text color for the selected option.
   */
  activeColor?: string;
  /**
   * The color for the toggle indicator.
   */
  indicatorColor?: string;
  /**
   * The color for the toggle switch border.
   */
  borderColor?: string;
};

/**
 * Toggle switch component.
 */
const ToggleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

/**
 * Toggle button component.
 * @param disabled If `true`, the toggle button will be disabled.
 * @param vertical If `true`, the toggle button will be displayed vertically.
 * @param optionCount The number of options in the toggle switch.
 * @param borderColor The color for the toggle switch border.
 * @returns A styled toggle button component.
 * @example
 * <ToggleButton disabled={false} vertical={false} optionCount={2} borderColor="#D67238" />
 */
const ToggleButton = styled(Box)<{
  disabled?: boolean;
  vertical: boolean;
  optionCount: number;
  borderColor?: string;
}>`
  display: flex;
  width: 100%;
  height: ${({ vertical, optionCount }) =>
    vertical ? `${48 * optionCount}px` : "48px"};
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: ${({ vertical, optionCount }) =>
      vertical ? `${80 * optionCount}px` : "80px"};
  }
  border-radius: 40px;
  border: 2px solid ${({ borderColor }) => borderColor || "#ffffff"};
  position: relative;
  overflow: visible;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s ease-in-out;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};
  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25),
      inset 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  &:hover .toggle-indicator {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

/**
 * Toggle indicator component.
 * @param vertical If `true`, the toggle indicator will be displayed vertically.
 * @param position The position of the toggle indicator.
 * @param optionCount The number of options in the toggle switch.
 * @param indicatorColor The color for the toggle indicator.
 * @returns A styled toggle indicator component to provide visual feedback for the selected option.
 * @example
 * <ToggleIndicator vertical={false} position={0} optionCount={2} indicatorColor="#D67238" />
 */
const ToggleIndicator = styled(motion.div)<{
  vertical: boolean;
  position: number;
  optionCount: number;
  indicatorColor?: string;
}>`
  position: absolute;
  background: ${({ indicatorColor }) => indicatorColor || "#D67238"};
  width: ${({ vertical }) =>
    vertical ? "calc(100% + 4px)" : "calc(100% / var(--options-length) + 4px)"};
  height: ${({ vertical }) =>
    vertical ? "calc(100% / var(--options-length) + 4px)" : "calc(100% + 4px)"};
  top: ${({ vertical, position, optionCount }) =>
    getTopPosition(vertical, position, optionCount)};
  left: -2px;
  border-radius: ${({ vertical, position, optionCount }) =>
    getBorderRadius(vertical, position, optionCount)};
  z-index: 1;
  transform: ${({ vertical, position }) =>
    vertical
      ? `translateY(calc(${position * 100}% - 2px))`
      : `translateX(calc(${position * 100}% - 2px))`};
`;

/**
 * Toggle text component.
 * @param active If `true`, the text color will be set to the active color.
 * @param activeColor The text color for the active option.
 * @returns A styled text component to display the options in the toggle switch.
 * @example
 * <ToggleText active={true} activeColor="#D67238">Option 1</ToggleText>
 */
const ToggleText = styled(Typography)<{
  active: boolean;
  activeColor?: string;
}>`
  flex: 1;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    font-size: 24px;
  }
  z-index: 2;
  color: ${({ active, activeColor }) =>
    active ? activeColor || "#D67238" : "#FFFFFF"};
  transition: color 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
`;

/**
 * Toggle switch component.
 * @param selected The index of the selected option.
 * @param onChange The function to call when the selected option changes.
 * @param options An array of options to display in the toggle switch.
 * @param disabled If `true`, the toggle switch will be disabled.
 * @param activeColor The text color for the selected option.
 * @param indicatorColor The color for the toggle indicator.
 * @param borderColor The color for the toggle switch border.
 * @returns A toggle switch component to select an option from a list.
 * @example
 * <ToggleSwitch selected={0} onChange={(value) => console.log(value)} options={["Option 1", "Option 2"]} />
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  selected,
  onChange,
  options,
  disabled,
  activeColor,
  indicatorColor,
  borderColor,
}) => {
  const [vertical, setVertical] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if the toggle switch should be displayed vertically
  useEffect(() => {
    const checkLayout = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const singleOptionWidth = containerWidth / options.length;
      // Check if the options will wrap
      const willWrap = options.some((option) => {
        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "nowrap";
        span.style.padding = "0 8px";
        span.textContent = option;
        document.body.appendChild(span);
        const width = span.offsetWidth;
        document.body.removeChild(span);
        return width + 10 > singleOptionWidth;
      });

      setVertical(willWrap);
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, [options]);

  return (
    <ToggleContainer ref={containerRef}>
      <ToggleButton
        disabled={disabled}
        vertical={vertical}
        optionCount={options.length as 2 | 3}
        style={{ "--options-length": options.length } as React.CSSProperties}
        borderColor={borderColor}
      >
        <ToggleIndicator
          indicatorColor={indicatorColor}
          className="toggle-indicator"
          vertical={vertical}
          position={selected}
          optionCount={options.length}
          style={{
            width: vertical
              ? "calc(100% + 4px)"
              : `calc(${100 / options.length}% + 4px)`,
            height: vertical
              ? `calc(${100 / options.length}%)`
              : "calc(100% + 4px)"
          }}
          initial={false}
          animate={{
            transform: vertical
              ? `translateY(calc(${selected * 100}% - 2px))`
              : `translateX(calc(${selected * 100}% - 2px))`
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {options.map((option, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "relative",
            }}
            onClick={() => !disabled && onChange(index)}
          >
            <ToggleText active={selected === index} activeColor={activeColor}>
              {option}
            </ToggleText>
          </Box>
        ))}
      </ToggleButton>
    </ToggleContainer>
  );
};