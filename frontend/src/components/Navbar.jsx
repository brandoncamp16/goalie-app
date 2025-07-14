import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
import { Settings } from 'lucide-react'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Link to={"/createEntry"} className='btn btn-primary'>
                        <PlusIcon className='size-5'/>
                        <span>New Entry</span>
                    </Link>
                    <Link to={"/calendar"} className='btn btn-primary'>
                        <CalendarDays className='size-5'/>
                        <span>Calendar</span>
                    </Link>
                </div>
                    <Link to={"/"}>
                        <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>Goalie</h1>
                    </Link>
                <div className='flex items-center gap-4'>
                    <Link to={"/settings"} className='btn btn-primary'>
                        <Settings className='size-5'/>
                        <span>Settings</span>
                    </Link>
                    <Link to={"/login"} className='btn btn-primary'>
                        <LogOut className='size-5'/>
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar