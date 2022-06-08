import React, { ReactNode } from 'react'
import { notification } from 'antd'
import { Image } from 'rebass'
import closeIcon  from 'assets/images/close.svg'
import successIcon  from 'assets/images/success.svg'
import failIcon  from 'assets/images/fail.svg'


export default function notifiy({
  type,
  message,
  description
} : {
  type: string
  message: string
  description: string | ReactNode
}) {
  const icon = type === 'success' ? successIcon : failIcon
  notification.success({
    className: 'farm-tips',
    icon: <Image src={icon} size='60px'/>,
    closeIcon: <Image src={closeIcon} size='14px'/>,
    message,
    description,
    duration: 5,
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}