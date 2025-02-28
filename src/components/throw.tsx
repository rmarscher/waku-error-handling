'use client';

import { useRef, useState } from 'react';
import { throwAction } from '../lib/throw';

export const Throw: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  return (
    <section className="border-blue-400 -mx-4 mt-4 rounded-sm border border-dashed p-4">
      <div>Throw</div>
      <form onSubmit={async (e) => {
        try {
          e.preventDefault();
          e.stopPropagation();
          const res = await throwAction(inputRef.current?.value);
          console.log("res", res);
        } catch (e) {
          try {
            const response = JSON.parse(e?.message);
            console.log("res", response);
            setError(response["_value"]["error"]);
          } catch {
            setError("Unexpected error");
            console.error(e);
          }
        }
      }}>
        <input ref={inputRef} className="rounded-xs border border-gray-300 px-2 py-0.5 text-sm" />
        <button
          type="submit"
          className="rounded-xs bg-black px-2 py-0.5 text-sm text-white"
        >
          Throw
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </section>
  );
};
