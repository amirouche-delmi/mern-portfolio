import React from 'react'

function LeftSider() {
  return (
    <div className='fixed left-0 bottom-0 px-10 sm:static'>
        <div className="flex flex-col items-center">
            <div class="flex flex-col gap-3 sm:flex-row">
                <a href="https://web.facebook.com/amirouche.delmi.9" target="_blank">
                    <i class="ri-facebook-circle-line text-gray-500"></i>
                </a>
                <a href="mailto:amirouche.delmi@gmail.com" target="_blank">
                    <i class="ri-mail-line text-gray-500"></i>
                </a>
                <a href="https://www.instagram.com/amirouche.delmi?theme=dark" target="_blank">
                    <i class="ri-instagram-line text-gray-500"></i>
                </a>
                <a href="https://www.linkedin.com/in/amirouche-delmi-892958234/" target="_blank">
                    <i class="ri-linkedin-box-line text-gray-500"></i>
                </a>
                <a href="https://github.com/amirouche-delmi" target="_blank">
                    <i class="ri-github-line text-gray-500"></i>
                </a>
            </div>
            <div className='w-[1px] h-32 bg-[#125f63] sm:hidden'>
            </div>
        </div>
    </div>
  )
}

export default LeftSider