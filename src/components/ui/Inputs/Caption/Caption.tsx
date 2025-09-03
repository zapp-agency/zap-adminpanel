import { HelpCircleIcon } from 'hugeicons-react'
import type { ReactNode } from 'react'

const InputCaption = ({children}:{children:ReactNode}) => {
  return (
    <div className='w-full flex gap-sm ps-sm items-center'>
        <HelpCircleIcon className='size-4.5 text-field-caption-icon-normal' />
        <span className='text-size-12 font-lg text-field-caption-message-normal'>{children}</span>
    </div>
  )
}

export default InputCaption