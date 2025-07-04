import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "../../../utils/util";

interface PriceSliderProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  value,
  onValueChange,
  min = 32,
  max = 400,
}) => {
  return (
    <div className="flex flex-col gap-1 pt-1">
      {/* Labels */}
      <div className="flex justify-between text-[13px] font-medium mb-1">
        <span className="text-gray-600">Price per day</span>
        <span className="text-black">${value[0]} - ${value[1]}</span>
      </div>

      {/* Slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-[18px]"
        value={value}
        onValueChange={(val) => onValueChange(val as [number, number])}
        min={min}
        max={max}
        step={1}
      >
        <Slider.Track className="bg-[#ccc] relative grow rounded-full h-[4px]">
          <Slider.Range className="absolute bg-[#cc1d1d] rounded-full h-[4px]" />
        </Slider.Track>
        <Slider.Thumb
          className={cn(
            "block w-[4px] h-[18px] bg-[#cc1d1d] rounded-sm border-none cursor-pointer"
          )}
        />
        <Slider.Thumb
          className={cn(
            "block w-[4px] h-[18px] bg-[#cc1d1d] rounded-sm border-none cursor-pointer"
          )}
        />
      </Slider.Root>
    </div>
  );
};

export default PriceSlider;
