
import { Icon } from "@/components/MaterialIconHelper";
import { Link } from "react-router-dom";

const notes = [
  { id: 1, title: "Articles", desc: "The definite and indefinite articles.", icon: "article" },
  { id: 2, title: "Adverbs", desc: "Words that modify verbs or adjectives.", icon: "text_fields" },
  { id: 3, title: "Nouns", desc: "Naming words for people, places, things.", icon: "title" },
  { id: 4, title: "Pronouns", desc: "Words that replace nouns.", icon: "person" },
  { id: 5, title: "Tenses", desc: "Past, present, and future forms.", icon: "schedule" },
  { id: 6, title: "Active & Passive", desc: "Subject performing or receiving the action.", icon: "record_voice_over" },
];

export default function NotesLibrary() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display">

      {/* Top Bar */}
      <div className="flex items-center p-4 pb-3 sticky top-0 z-10 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-white/10">
        <Link to="/" className="flex size-10 shrink-0 items-center justify-start">
          <Icon name="arrow_back_ios_new" className="text-zinc-800 dark:text-white text-2xl" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-white">
          PDF Notes Library
        </h1>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-10 bg-transparent">
            <Icon name="search" className="text-zinc-800 dark:text-white text-2xl" />
          </button>
        </div>
      </div>

      {/* List */}
      <main className="flex-1 px-4 py-4 space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="flex w-full items-center gap-4 rounded-xl bg-white dark:bg-zinc-900/50 p-4 min-h-[72px] shadow-sm border border-gray-100 dark:border-transparent">
            <div className="flex items-center gap-4 flex-grow">
              <div className="text-white flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                <Icon name={note.icon} className="text-primary text-3xl" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-zinc-900 dark:text-white text-base font-medium leading-normal line-clamp-1">{note.title}</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal line-clamp-2">{note.desc}</p>
              </div>
            </div>
            <div className="shrink-0">
              <div className="text-zinc-500 dark:text-zinc-400 flex size-8 items-center justify-center">
                <Icon name="download" />
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
