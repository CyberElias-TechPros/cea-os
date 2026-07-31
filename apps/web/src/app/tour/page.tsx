'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Badge, Button } from '@cea/ui';
import { MapPin, Maximize2, RotateCcw, GraduationCap, Laptop, Users, Coffee, FlaskConical, Library } from 'lucide-react';
import Link from 'next/link';

const SPOTS = [
  { id: 'campus', name: 'Main Campus Entrance', desc: 'The welcoming hub of the academy — reception, student services and the founder wall.', icon: MapPin, x: 50, y: 45 },
  { id: 'lab', name: 'Cyber Lab 1', desc: '48 workstations with dedicated security testing ranges and air-gapped networks for ethical hacking modules.', icon: Laptop, x: 30, y: 30 },
  { id: 'class', name: 'Lecture Hall B', desc: 'Hybrid teaching space seating 120 with live-streaming cameras used for our online-first classes.', icon: Users, x: 70, y: 30 },
  { id: 'lib', name: 'Resource Library', desc: 'Study carrels, textbooks, and quiet zones open 07:00–22:00.', icon: Library, x: 25, y: 65 },
  { id: 'lab2', name: 'Data Science Studio', desc: 'GPU cluster and Jupyter workstations for the data science programme.', icon: FlaskConical, x: 72, y: 62 },
  { id: 'cafe', name: 'Student Café', desc: 'Coffee, collaboration and the notice board for events, gigs and mentorship meetups.', icon: Coffee, x: 50, y: 78 },
];

const PANELS = [
  'from-sky-400 via-indigo-500 to-purple-600',
  'from-amber-300 via-orange-400 to-rose-500',
  'from-emerald-400 via-teal-500 to-cyan-600',
  'from-fuchsia-400 via-pink-500 to-rose-600',
];

export default function TourPage() {
  const [selected, setSelected] = useState(SPOTS[0]!);
  const [angle, setAngle] = useState(0);
  const [panel, setPanel] = useState(0);
  const dragRef = useRef<{ startX: number; startAngle: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      setAngle(dragRef.current.startAngle + dx);
      setPanel(Math.floor(Math.abs(angle + dx) / 90) % PANELS.length);
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [angle]);

  const rotate = (dir: number) => {
    setAngle(a => a + dir * 45);
    setPanel(p => (p + (dir > 0 ? 1 : PANELS.length - 1)) % PANELS.length);
  };

  return (
    <div className="min-h-[80vh] py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4">Virtual Campus Tour</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Step inside Cyber Elias Academy</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Drag the panorama to look around, or click the hotspots to explore labs, classrooms and study spaces.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="relative rounded-2xl overflow-hidden border select-none touch-none aspect-[16/9] cursor-grab active:cursor-grabbing"
            onPointerDown={e => { dragRef.current = { startX: e.clientX, startAngle: angle }; }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${PANELS[panel]} transition-colors duration-500`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/90">
                <GraduationCap className="h-16 w-16 mx-auto mb-3 drop-shadow" />
                <p className="font-light tracking-widest uppercase text-sm">Campus {panel + 1} — Panorama</p>
              </div>
            </div>
            <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)`, transition: 'transform 0.1s linear' }} />

            {SPOTS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                title={s.name}
              >
                <span className={`block h-6 w-6 rounded-full bg-white/30 backdrop-blur border-2 border-white flex items-center justify-center group-hover:scale-125 transition-transform ${selected.id === s.id ? 'bg-white' : ''}`}>
                  <s.icon className={`h-3 w-3 ${selected.id === s.id ? 'text-indigo-600' : 'text-white'}`} />
                </span>
              </button>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => rotate(-1)}><RotateCcw className="h-3.5 w-3.5" /></Button>
              <span className="text-xs text-white/80 bg-black/30 backdrop-blur rounded-full px-3 py-1">Drag to look around · {panel + 1}/{PANELS.length}</span>
              <Button size="sm" variant="secondary" onClick={() => rotate(1)}><RotateCcw className="h-3.5 w-3.5 rotate-180" /></Button>
            </div>
            <div className="absolute top-4 right-4"><Badge variant="secondary" className="backdrop-blur"><Maximize2 className="h-3 w-3 mr-1" /> 360°</Badge></div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SPOTS.map(s => (
              <button key={s.id} onClick={() => setSelected(s)} className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${selected.id === s.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-input hover:border-primary/50'}`}>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center"><selected.icon className="h-4 w-4 text-primary" /></div>
                <h2 className="font-semibold">{selected.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{selected.desc}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Plan a visit</h3>
              <p className="text-sm text-muted-foreground">Prefer to see it in person? Book a guided campus visit — weekdays 09:00–15:00.</p>
              <Link href="/visit"><Button className="w-full">Book a visit</Button></Link>
              <Link href="/apply"><Button variant="outline" className="w-full">Apply to study</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
