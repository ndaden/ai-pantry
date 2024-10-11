"use client";
import {
  LegacyRef,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card } from "./ui/card";
import { CheckIcon, TrashIcon } from "lucide-react";

interface SwipeableCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SwipeableCard = ({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableCardProps) => {
  const [startX, setStartX] = useState<any>(null);
  const [widthRoot, setWidthRoot] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const itemRef: LegacyRef<HTMLDivElement> | null = useRef(null);

  useEffect(() => {
    const width = itemRef.current?.getBoundingClientRect().width;
    setWidthRoot(width ?? 0);
  }, []);

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    setStartX(e.clientX);
  };

  const onMouseUpHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (translateX >= 25 && onSwipeRight) {
      onSwipeRight();
    }
    if (translateX <= -25 && onSwipeLeft) {
      onSwipeLeft();
    }
    setStartX(null);
    setTranslateX(0);
  };

  const onMouseMoveHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (startX) {
      const currentX = e.clientX;
      const deltaX = currentX - startX;
      const deltaXPercent = Math.ceil((deltaX / widthRoot) * 100);

      setTranslateX(deltaXPercent);
      const limitedTranslateX = Math.min(Math.max(deltaXPercent, -25), 25);
      setTranslateX(limitedTranslateX);
    }
  };
  return (
    <div className="relative">
      <Card
        ref={itemRef}
        className={`${className}`}
        style={{
          transform: `translateX(${translateX}%)`,
          transition: "0.2s ease",
        }}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        onMouseMove={onMouseMoveHandler}
      >
        {children}
      </Card>
      <div className="mx-1 leftSide absolute top-0 left-0 w-[50%] h-[100%] z-[-1] flex items-center bg-red-600  rounded-lg">
        <TrashIcon className="h-10 w-10" />
      </div>
      <div className="mx-1 rightSide absolute top-0 right-0 w-[50%] h-[100%] z-[-1] flex items-center bg-green-600 rounded-lg">
        <CheckIcon className="h-10 w-10" />
      </div>
    </div>
  );
};

export default SwipeableCard;
