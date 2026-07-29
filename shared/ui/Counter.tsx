import { CounterProps } from "@/shared/ui/types/counter";
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  min = 1,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value <= min) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value, min]);

  const canReduce = value > min;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600 text-sm">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className={`
            w-8
            h-8
            rounded-full
            border-[1px]
            flex
            items-center
            justify-center
            transition
            ${
              canReduce
                ? "border-neutral-400 text-neutral-600 cursor-pointer hover:border-neutral-800"
                : "border-neutral-200 text-neutral-300 cursor-not-allowed"
            }
          `}
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-base text-neutral-600 w-4 text-center">
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
            w-8
            h-8
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:border-neutral-800
            transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};
