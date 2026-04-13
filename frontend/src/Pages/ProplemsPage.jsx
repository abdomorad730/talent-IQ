import React from 'react'
import Navbar from '../components/Navbar'
import { PROBLEMS } from '../data/problems'
import { Link } from 'react-router'
import { ChevronRightIcon, Code2Icon } from 'lucide-react'
import { getDifficultyColor } from '../lib/utils'

function ProplemsPage() {
  const problems = Object.values(PROBLEMS)
  const easyCount = problems.filter(p => p.difficulty.toLowerCase() === 'easy').length
  const mediumCount = problems.filter(p => p.difficulty.toLowerCase() === 'medium').length
  const hardCount = problems.filter(p => p.difficulty.toLowerCase() === 'hard').length

  return (
    <div className='min-h-screen bg-base-100'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-12'>

        {/* HEADER */}
        <div className=' mb-8'>
          <h1 className='text-4xl font-bold mb-2 text-primary'>Practice Problems</h1>
          <p className='text-lg text-base-content/80 mb-8'>Sharpen your coding skills with these curated  problems.</p>
        </div>

        {/* PROBLEMS GRID */}
        <div className="space-y-7">
          {problems.map((problem) => (
            <Link key={problem.id} to={`/problems/${problem.id}`} className=" card bg-base-300  hover:scale-[1.01] transition-transform duration-200">
              <div className="card-body">
                <div className="flex items-center gap-4 justify-between">
                  {/*left side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center ">
                        <Code2Icon className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">{problem.title}</h2>
                          <span className={`badge ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</span>
                        </div>
                        <p className="text-base-content/60 text-sm">{problem.category}</p>
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-3">{problem.description.text}</p>
                  </div>
                  {/* right side */}
                  <div className="flex items-center gap-2 text-primary">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* stats div */}
        <div className="mt-12 card bg-base-100 shadow-lg"> 
          <div className="card-body">
            <div className='stats stats-vertical lg:stats-horizontal'>
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-primary">{easyCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardCount}

                </div>



              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProplemsPage
