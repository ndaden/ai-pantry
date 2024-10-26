"use client";
import {
  forwardRef,
  LegacyRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card } from "./ui/card";
import { SquarePenIcon, TrashIcon } from "lucide-react";

interface SwipeableCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SwipeableCard = forwardRef(
  (
    { children, className, onSwipeLeft, onSwipeRight }: SwipeableCardProps,
    ref: LegacyRef<any>
  ) => {
    const [startX, setStartX] = useState<any>(null);
    const [widthRoot, setWidthRoot] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const itemRef: LegacyRef<HTMLDivElement> | null = useRef(null);

    useEffect(() => {
      const width = itemRef.current?.getBoundingClientRect().width;
      setWidthRoot(width ?? 0);
    }, []);

    const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
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

    const onTouchStartHandler: TouchEventHandler<HTMLDivElement> = (e) => {
      setStartX(e.touches[0].clientX);
    };

    const onTouchEndHandler: TouchEventHandler<HTMLDivElement> = (e) => {
      if (translateX >= 25 && onSwipeRight) {
        onSwipeRight();
      }
      if (translateX <= -25 && onSwipeLeft) {
        onSwipeLeft();
      }
      setStartX(null);
      setTranslateX(0);
    };

    const onTouchMoveHandler: TouchEventHandler<HTMLDivElement> = (e) => {
      if (startX) {
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        const deltaXPercent = Math.ceil((deltaX / widthRoot) * 100);

        setTranslateX(deltaXPercent);
        const limitedTranslateX = Math.min(Math.max(deltaXPercent, -25), 25);
        setTranslateX(limitedTranslateX);
      }
    };

    return (
      <div className="relative" ref={ref}>
        <Card
          ref={itemRef}
          className={`${className}`}
          style={{
            transform: `translateX(${translateX}%)`,
            transition: "0.2s ease",
          }}
          onTouchStart={onTouchStartHandler}
          onTouchEnd={onTouchEndHandler}
          onTouchMove={onTouchMoveHandler}
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          onMouseMove={onMouseMoveHandler}
        >
          {children}
        </Card>
        {onSwipeRight && (
          <div className="mx-1 leftSide absolute top-0 left-0 w-[50%] h-[100%] z-[-1] flex items-center justify-start bg-zinc-500 rounded-lg pl-3">
            <SquarePenIcon className="h-7 w-7 text-white" />
          </div>
        )}
        {onSwipeLeft && (
          <div className="mx-1 rightSide absolute top-0 right-0 w-[50%] h-[100%] z-[-1] flex items-center justify-end bg-red-600 rounded-lg pr-3">
            <TrashIcon className="h-7 w-7 text-white" />
          </div>
        )}
      </div>
    );
  }
);

SwipeableCard.displayName = "SwipeableCard";

export default SwipeableCard;
