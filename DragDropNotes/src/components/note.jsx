import React, { forwardRef } from 'react'

const Note = forwardRef(({content, initialPos, ...props}, ref) => {
  return (
    <div ref={ref}
      style={{
        top: initialPos?.y,
        left: initialPos?.x,
      }}
      className="absolute border-b-black border-2 w-42 bg-yellow-200 cursor-move select-none p-2" 
      {...props}
    >
      📌{content}
    </div>
  );
})

export default Note