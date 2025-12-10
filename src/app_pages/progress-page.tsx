import { BottomNav } from "@/components/bottom-navigation";
import { Icon } from "@/components/material-icon-helper";

import { Link } from "react-router-dom";


export default function ProgressTracking() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display pb-20">

      {/* Header */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <Link to="/" className="flex size-12 shrink-0 items-center justify-center">
          <Icon name="arrow_back" className="text-gray-900 dark:text-white" />
        </Link>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center">My Progress</h2>
        <div className="flex size-12 shrink-0"></div>
      </div>

      <div className="flex flex-col gap-6 p-4">

        {/* Stats Grid */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#3c5345] bg-white dark:bg-[#111814]/50 shadow-sm">
            <p className="text-gray-500 dark:text-[#9db8a9] text-base font-medium">Tests Attempted</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">12</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#3c5345] bg-white dark:bg-[#111814]/50 shadow-sm">
            <p className="text-gray-500 dark:text-[#9db8a9] text-base font-medium">Correct Answers</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">102</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#3c5345] bg-white dark:bg-[#111814]/50 shadow-sm">
            <p className="text-gray-500 dark:text-[#9db8a9] text-base font-medium">Incorrect Answers</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">18</p>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex flex-wrap gap-4 rounded-xl border border-gray-200 dark:border-[#3c5345] p-6 bg-white dark:bg-[#111814]/50 shadow-sm">
          <div className="flex min-w-72 flex-1 flex-col gap-2">
            <p className="text-gray-900 dark:text-white text-base font-medium">Weekly Performance</p>
            <div className="flex items-end gap-2">
              <p className="text-gray-900 dark:text-white text-[32px] font-bold leading-tight">85%</p>
              <p className="text-primary text-base font-medium pb-1">+5%</p>
            </div>

            {/* Simple CSS Bar Chart based on your HTML */}
            <div className="mt-4 grid min-h-[180px] grid-flow-col gap-2 sm:gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex flex-col items-center w-full h-full justify-end gap-2">
                  <div
                    className={`w-full rounded-t-lg transition-all ${i === 6 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`}
                    style={{ height: `${[70, 30, 40, 60, 20, 85, 85][i]}%` }}
                  ></div>
                  <p className="text-gray-500 dark:text-[#9db8a9] text-[13px] font-bold">{day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion History */}
        <div className="flex flex-col">
          <div className="pb-3 border-b border-gray-200 dark:border-[#3c5345]">
            <div className="flex gap-8">
              <button className="border-b-[3px] border-primary text-gray-900 dark:text-white pb-3 pt-4 font-bold">
                Test History
              </button>
              <button className="border-b-[3px] border-transparent text-gray-500 dark:text-[#9db8a9] pb-3 pt-4 font-bold hover:text-gray-900 dark:hover:text-white">
                Category Breakdown
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            {[
              { title: "Advanced Grammar Quiz", score: "85%", date: "Today", correct: 17, wrong: 3 },
              { title: "Vocabulary Set 5", score: "90%", date: "Yesterday", correct: 18, wrong: 2 },
              { title: "Intermediate Verbs", score: "75%", date: "Oct 22", correct: 15, wrong: 5 },
            ].map((item, i) => (
              <details key={i} className="group border-b border-gray-200 dark:border-[#3c5345] py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4">
                  <p className="text-gray-900 dark:text-white text-base font-medium">{item.title} - {item.score} ({item.date})</p>
                  <Icon name="expand_more" className="text-gray-500 dark:text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pb-4">
                  <p className="text-gray-500 dark:text-[#9db8a9] text-sm">Detailed breakdown of results.</p>
                  <div className="mt-3 flex gap-4">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Correct: {item.correct}</span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">Incorrect: {item.wrong}</span>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
