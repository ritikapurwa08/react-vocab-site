import { BottomNav } from "@/components/BottomNavigation";
import { InstallPWA } from "@/components/InstallPWA";
import { Icon } from "@/components/MaterialIconHelper";
import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display pb-24">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <Icon name="school" className="text-gray-900 dark:text-white text-3xl" />
        </div>
        <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
          Welcome back, Alex!
        </h1>
        <div className="flex items-center justify-end gap-2">
          {/* Install Button will appear here if supported */}
          <InstallPWA />

          <button className="flex items-center justify-center rounded-lg h-12 bg-transparent text-gray-900 dark:text-white">
            <Icon name="account_circle" className="text-3xl" />
          </button>
        </div>
      </div>

      <div className="flex-grow px-4">
        {/* Progress Section */}
        <h2 className="text-gray-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-left pt-5 pb-3">
          Your Progress
        </h2>
        <div className="flex flex-col gap-3 p-4 bg-white dark:bg-[#1c2620] rounded-lg border border-gray-200 dark:border-transparent">
          <div className="flex gap-6 justify-between">
            <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">Overall Progress</p>
            <p className="text-gray-900 dark:text-white text-base font-bold leading-normal">75%</p>
          </div>
          <div className="rounded-full bg-gray-200 dark:bg-[#3c5345]">
            <div className="h-2 rounded-full bg-primary" style={{ width: "75%" }}></div>
          </div>
          <p className="text-gray-500 dark:text-[#9db8a9] text-sm font-normal leading-normal">
            Keep up the great work!
          </p>
        </div>

        {/* Start Session Header */}
        <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-8 pb-3">
          Start a new session
        </h2>

        {/* Cards Section */}
        <div className="flex flex-col gap-4">

          {/* Card 1: Word Learning */}
          <Link to="/learn" className="block">
            <div className="flex flex-col items-stretch justify-start rounded-lg bg-white dark:bg-[#1c2620] overflow-hidden border border-gray-200 dark:border-transparent">
              <div
                className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6tbsn0CergDVjiVef_6CT6eH629T0oso_GCxgR6UDlyp-il3NgmYhnr-c-WbZXguLNjsk3zaSISh-VA8rJfUrHSBNrTF8TIKOIokn5zG1teXiX4x6yuCbgt96Op2u8QMChh3FLdS4Un4lSnT_V0akFCxhzFtxYX_InaU8f48nsJ0zxfwqMOv-0Q7fKJ8MPwG1fGv6_0Z060AkcY3LNiaH6QWKUYgvVQHpCTo7756v_MrxTxM_W4fI5WXsiui-T4mx7lBbz3Ojvwuh")' }}
              ></div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Word Learning</p>
                <p className="text-gray-500 dark:text-[#9db8a9] text-base font-normal leading-normal flex-grow">
                  Expand your vocabulary with daily flashcards.
                </p>
                <div className="flex items-center justify-end pt-2">
                  <div className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal">
                    Start New Session
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: PDF Notes */}
          <Link to="/notes" className="block">
            <div className="flex flex-col items-stretch justify-start rounded-lg bg-white dark:bg-[#1c2620] overflow-hidden border border-gray-200 dark:border-transparent">
              <div
                className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2OvwCSApdRj99Ws-nwZVH_0PETc02_jdy6nRoNX4rKP9yahzLtr2FnmWTIgWqi4f2zmlgNM53YlnaV6NVuK45Fd3J77v8HC79fSLXD8tM9pN3F2zyV6DFPEiW-QI1rCLXAT3d98dgOBjtapf29dWXNrk9ELxMyHrzqWge0QMFoFFjhNQrjW7nlNu4Tr6yGDnW5G3d5bE1Lh5wRca9G8oTnao3OQf_1nYqbSVjlOaxMtMDT4C_eaygWlUpmnpR66xvmhqlykJvWcGN")' }}
              ></div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">PDF Notes</p>
                <p className="text-gray-500 dark:text-[#9db8a9] text-base font-normal leading-normal flex-grow">
                  Review your grammar and lesson notes.
                </p>
                <div className="flex items-center justify-end pt-2">
                  <div className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal">
                    View All Notes
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Tests */}
          <Link to="/tests" className="block">
            <div className="flex flex-col items-stretch justify-start rounded-lg bg-white dark:bg-[#1c2620] overflow-hidden border border-gray-200 dark:border-transparent">
              <div
                className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6zPLAvy1orthv6fs-0m_ZDFWF4m8pTKjguqKhyrreCfNIKOMebMm0MqKQqxi0RIXBbWGM65DyOzVhudX-i4po_Feyw0artNmjN-Q8awaGKEjAYP1hRwAtTzBCRC6BdYrAGhHQcs5w69gmYQaJFWGqHeNNxtdFhTmujfXuZXXPudOoLO9u0PfnjmBoZ8k02G5uoKYYBpMig4LI9ndTzgAAwcAJUCEIQSn_jEpXcP5xHyEZ2zTH6EmjZ3Uj9OUAwgkk2N_q4YVrMRRn")' }}
              ></div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Tests</p>
                <p className="text-gray-500 dark:text-[#9db8a9] text-base font-normal leading-normal flex-grow">
                  Check your understanding with practice quizzes.
                </p>
                <div className="flex items-center justify-end pt-2">
                  <div className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal">
                    Take a Practice Test
                  </div>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
      <BottomNav />
    </div>
  );
}
