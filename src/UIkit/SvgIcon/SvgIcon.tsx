import { FC } from 'react'

import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'

import { ReactComponent as InstallIcon } from './icons/InstallButton/install.svg'
import { ReactComponent as InstalledIcon } from './icons/InstallButton/installed.svg'
import { ReactComponent as UninstallIcon } from './icons/InstallButton/uninstall.svg'
import { ReactComponent as SmarTagCross } from './icons/SmartTag/smarttagcross.svg'

interface SvgIconProps {
  icon: InstallButtonMode | 'smarttagcross'
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

    case 'smarttagcross': {
      return <SmarTagCross />
    }

    default: {
      return null
    }
  }
}

export default SvgIcon
