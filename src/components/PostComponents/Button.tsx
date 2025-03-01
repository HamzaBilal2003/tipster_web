import React from 'react';

type props = {
  handleFuncion?:(value?:any) => void
  Text:string
}

export function Button({Text,handleFuncion}:props) {
  return (
    <button className="bg-red-700 capitalize cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors" onClick={handleFuncion}>
      {Text}
    </button>
  );
}