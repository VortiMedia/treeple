import Link from 'next/link';
import { Mountain } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Mountain className="h-6 w-6 text-primary" />
      <div className="flex flex-col">
        <span className="font-semibold text-lg text-slate-900 leading-tight">Treeple</span>
        <span className="text-xs text-slate-500 leading-tight">Yellowstone</span>
      </div>
    </Link>
  );
}
