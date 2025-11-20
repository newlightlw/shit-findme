import React from 'react';

export const BRISTOL_SCALE = [
  { type: 1, label: "类型 1", desc: "坚硬的坚果状，很难排出", color: "bg-amber-800" },
  { type: 2, label: "类型 2", desc: "香肠状，但有结块", color: "bg-amber-700" },
  { type: 3, label: "类型 3", desc: "香肠状，表面有裂纹", color: "bg-amber-600" },
  { type: 4, label: "类型 4", desc: "平滑柔软的香肠或蛇状 (最健康)", color: "bg-amber-500" },
  { type: 5, label: "类型 5", desc: "边缘清晰的软块，容易排出", color: "bg-amber-400" },
  { type: 6, label: "类型 6", desc: "边缘粗糙的蓬松块，糊状", color: "bg-yellow-600" },
  { type: 7, label: "类型 7", desc: "水状，无固体块 (腹泻)", color: "bg-yellow-700" },
];

// Icons as components to avoid external deps issues in this environment
// Using React.createElement because this is a .ts file, not .tsx
export const Icons = {
  Poop: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("path", { d: "M10 12h.01" }),
    React.createElement("path", { d: "M14.5 12h.01" }),
    React.createElement("path", { d: "M12 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" }),
    React.createElement("path", { d: "M6 13c0-4.4 3.6-8 8-8s8 3.6 8 8c0 3.1-1.7 5.8-4.2 7.1-1.6.8-2.6 2.5-2.6 4.3 0 .3-.2.6-.5.6h-1.4c-.3 0-.5-.3-.5-.6 0-1.8-1-3.5-2.6-4.3C7.7 18.8 6 16.1 6 13Z" })
  ),
  Timer: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("line", { x1: "10", x2: "14", y1: "2", y2: "2" }),
    React.createElement("line", { x1: "12", x2: "15", y1: "14", y2: "11" }),
    React.createElement("circle", { cx: "12", cy: "14", r: "8" })
  ),
  Chart: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("path", { d: "M3 3v18h18" }),
    React.createElement("path", { d: "m19 9-5 5-4-4-3 3" })
  ),
  Map: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("polygon", { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" }),
    React.createElement("line", { x1: "9", x2: "9", y1: "3", y2: "18" }),
    React.createElement("line", { x1: "15", x2: "15", y1: "6", y2: "21" })
  ),
  Message: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })
  ),
  Play: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" })
  ),
  Pause: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("rect", { width: "4", height: "16", x: "6", y: "4" }),
    React.createElement("rect", { width: "4", height: "16", x: "14", y: "4" })
  ),
  Sparkles: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("path", { d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z" }),
    React.createElement("path", { d: "M5 3v4" }),
    React.createElement("path", { d: "M9 5H5" }),
    React.createElement("path", { d: "M6 17v4" }),
    React.createElement("path", { d: "M8 19H4" })
  ),
  Check: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("polyline", { points: "20 6 9 17 4 12" })
  ),
  X: (props: any) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("path", { d: "M18 6 6 18" }),
    React.createElement("path", { d: "m6 6 12 12" })
  )
};