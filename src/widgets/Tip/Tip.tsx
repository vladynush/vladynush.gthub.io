import React, {
  cloneElement,
  createElement,
  FC,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import cn from 'clsx';
import s from './Tip.module.css';
import { createPortal } from 'react-dom';

export type TipProps = {
  className?: string;
  children: ReactElement;
  title: React.ReactNode;
  container?: HTMLElement;
  followCursor?: boolean;
  showDelay?: number;
};

export enum TipType {
  mount,
  visible,
  unmount,
  invisible,
}

type TipState = { visible: boolean; mount: boolean };
type TipAction = { type: TipType };
type Position = { top: number; left: number };

export enum TipPlace {
  top = 'top',
  bottom = 'bottom',
}

const reducer = (state: TipState, action: TipAction): TipState => {
  switch (action.type) {
    case TipType.invisible:
      return { ...state, visible: false };
    case TipType.mount:
      return { mount: true, visible: false };
    case TipType.visible:
      return { mount: true, visible: true };
    case TipType.unmount:
      return { mount: false, visible: false };
    default:
      return state;
  }
};

const CURSOR_OFFSET = 3;

export const Tip: FC<TipProps> = ({
  className,
  children,
  title,
  container = document.body,
  followCursor,
  showDelay,
}) => {
  const [state, dispatch] = useReducer(reducer, { mount: false, visible: false });
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [place, setPlace] = useState<TipPlace>(TipPlace.top);
  const tipRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const cursorRef = useRef<Position>({ top: 0, left: 0 });

  const child = React.Children.only(children);
  const { style, className: childClassName } = child.props;

  const clonedChild = cloneElement(child, {
    style: null,
    className: null,
  });

  const updatePosition = () => {
    if (!holderRef.current) return;
    const rect = holderRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setPosition({
      left: rect.x + rect.width / 2 - containerRect.x,
      top: rect.y - containerRect.y,
    });
  };
  const handleMoveRef = useRef<(e: MouseEvent) => void>();

  const onMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: TipType.mount });

    const delay = showDelay ?? 150;

    if (followCursor) {
      handleMoveRef.current = (e: MouseEvent) => {
        cursorRef.current = {
          left: e.clientX,
          top: e.clientY + CURSOR_OFFSET,
        };
      };

      window.addEventListener('mousemove', handleMoveRef.current);

      timeoutRef.current = window.setTimeout(() => {
        if (handleMoveRef.current) {
          window.removeEventListener('mousemove', handleMoveRef.current);
        }
        setPosition(cursorRef.current);
        dispatch({ type: TipType.visible });
      }, delay);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        updatePosition();
        dispatch({ type: TipType.visible });
      }, delay);
    }
  };

  const onMouseLeave = () => {
    if (handleMoveRef.current) {
      window.removeEventListener('mousemove', handleMoveRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      dispatch({ type: TipType.invisible });
      setTimeout(() => dispatch({ type: TipType.unmount }), 300);
    }, 800);
  };

  useLayoutEffect(() => {
    if (!tipRef.current || !state.mount || followCursor) return;

    const tipRect = tipRef.current.getBoundingClientRect();
    const holderRect = holderRef.current.getBoundingClientRect();

    if (tipRect.top < 8) {
      setPlace(TipPlace.bottom);
      setPosition((prev) => ({
        ...prev,
        top: prev.top + holderRect.height,
      }));
    } else {
      setPlace(TipPlace.top);
    }
  }, [state.mount, followCursor]);

  useEffect(() => {
    if (!state.mount || followCursor) return;

    const holder = holderRef.current;
    if (!holder) return;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(holder);
    resizeObserverRef.current = observer;

    return () => observer.disconnect();
  }, [state.mount, followCursor]);

  useEffect(() => {
    if (!state.mount) setPlace(TipPlace.top);
  }, [state.mount]);

  const parentElement = createElement(
    child.type,
    {
      ...child.props,
      style,
      className: childClassName,
      ref: holderRef,
      onMouseEnter,
      onMouseLeave,
    },
    clonedChild
  );

  return (
    <>
      {state.mount &&
        createPortal(
          <div
            ref={tipRef}
            style={position}
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={onMouseLeave}
            className={cn(s.root, s[place], state.visible && s.visible, className)}
            role="tooltip"
            aria-hidden={!state.visible}
          >
            {title}
          </div>,
          container
        )}
      {parentElement}
    </>
  );
};
