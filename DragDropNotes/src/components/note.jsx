import React, { forwardRef } from 'react'

const Note = forwardRef(({content, initialPos, onDelete, ...props}, ref) => {
  return (
    <div ref={ref}
      style={{
        position: 'absolute',
        top: initialPos?.y,
        left: initialPos?.x,
      }}
      className="absolute border-b-black border-2 w-48 bg-yellow-200 cursor-move select-none p-2" 
      {...props}
    >
      <div className="flex justify-between items-start">
        <span>📌</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="cursor-pointer hover:scale-110 transition-transform"
          style={{ background: 'none', border: 'none', fontSize: '16px' }}
        >
          ✖️
        </button>
      </div>
      <div className="mt-1">{content}</div>
    </div>
  );
})

export default Note