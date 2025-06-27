import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';

import { cn } from '../../lib/utils';

const PopupCard = PopoverPrimitive.Root;

const PopupCardTrigger = PopoverPrimitive.Trigger;

const PopupCardContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
  const dragRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-muted text-muted-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-input z-50 w-64 rounded-md border p-4 shadow-md outline-none',
          className
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        onInteractOutside={e => {
          // Prevent closing on outside click
          e.preventDefault();
        }}
        {...props}
      >
        <div
          ref={dragRef}
          className="mb-2 flex cursor-grab items-center justify-between"
          onMouseDown={handleMouseDown}
        >
          <div className="h-2 w-16 rounded-full bg-gray-300" />
          <PopoverPrimitive.Close
            className="h-4 w-4 opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </PopoverPrimitive.Close>
        </div>
        {props.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
PopupCardContent.displayName = PopoverPrimitive.Content.displayName;

export { PopupCard, PopupCardTrigger, PopupCardContent };
