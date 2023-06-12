import { FC } from 'react'

import { ButtonMode } from 'components/InstallButton/InstallButton'

import { ReactComponent as InstallIcon } from './icons/InstallButton/install.svg'
import { ReactComponent as InstalledIcon } from './icons/InstallButton/installed.svg'
import { ReactComponent as UninstallIcon } from './icons/InstallButton/uninstall.svg'

interface SvgIconProps {
  icon: ButtonMode
}

const SvgIcon: FC<SvgIconProps> = ({ icon }) => {
  switch (icon) {
    case ButtonMode.INSTALL: {
      return <InstallIcon />
    }

    case ButtonMode.INSTALLED: {
      return <InstalledIcon />
    }

    case ButtonMode.UNINSTALL: {
      return <UninstallIcon />
    }

    default: {
      return null
    }
  }
}

export default SvgIcon
