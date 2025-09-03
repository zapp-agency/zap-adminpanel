import { HelpCircleIcon } from 'hugeicons-react'
import type { ReactNode } from 'react'

const InputError = ({children}:{children:ReactNode}) => {
  return (
    <div className='w-full flex gap-sm ps-sm items-center'>
        <HelpCircleIcon className='size-4.5 text-field-Error-message-icon' />
        <span className='text-size-12 font-lg text-field-Error-message'>{children}</span>
    </div>
  )
}

export default InputError