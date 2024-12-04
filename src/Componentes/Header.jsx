import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {

  return (
    <>
        <div className='bg-slate-800 py-4'>
            <div className='px-8 flex justify-between items-center'>
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
                <ExitToAppIcon sx={{ color: 'white' }} />
            </div>
        </div>
    </>
  )
}

export default Header