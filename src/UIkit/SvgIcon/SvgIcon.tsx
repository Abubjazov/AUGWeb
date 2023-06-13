import { FC } from 'react'

import { InstallButtonMode } from 'UIkit/InstallButton/InstallButton'

import { ReactComponent as InstallIcon } from './icons/InstallButton/install.svg'
import { ReactComponent as InstalledIcon } from './icons/InstallButton/installed.svg'
import { ReactComponent as UninstallIcon } from './icons/InstallButton/uninstall.svg'

interface SvgIconProps {
  icon: InstallButtonMode
}

const SvgIcon: FC<SvgIconProps> = ({ icon }) => {
  switch (icon) {
    case InstallButtonMode.INSTALL: {
      return <InstallIcon />
    }

    case InstallButtonMode.INSTALLED: {
      return <InstalledIcon />
    }

    case InstallButtonMode.UNINSTALL: {
      return <UninstallIcon />
    }

    default: {
      return null
    }
  }
}

export default SvgIcon
