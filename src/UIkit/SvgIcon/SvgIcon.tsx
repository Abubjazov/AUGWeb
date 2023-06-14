import { FC } from 'react'

import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'

import { ReactComponent as InstallIcon } from './icons/InstallButton/install.svg'
import { ReactComponent as InstalledIcon } from './icons/InstallButton/installed.svg'
import { ReactComponent as UninstallIcon } from './icons/InstallButton/uninstall.svg'
import { ReactComponent as LogoIcon } from './icons/logo.svg'
import { ReactComponent as AllDappletsIcon } from './icons/MenuButton/alldapplets.svg'
import { ReactComponent as EditorChoiceIcon } from './icons/MenuButton/editorchoice.svg'
import { ReactComponent as EssentialDappletsIcon } from './icons/MenuButton/essentialdapplets.svg'
import { ReactComponent as FinancialDappletsIcon } from './icons/MenuButton/financialdapplets.svg'
import { ReactComponent as SocialNetworksIcon } from './icons/MenuButton/socialnetworks.svg'
import { ReactComponent as RedCrossIcon } from './icons/redcross.svg'
import { ReactComponent as SmarTagCrossIcon } from './icons/SmartTag/smarttagcross.svg'

export enum MenuButtonIcon {
  ALL_DAPPLETS = 'alldapplets',
  ESSENTIAL_DAPPLETS = 'essentialdapplets',
  FINANCIAL_DAPPLETS = 'financialdapplets',
  EDITOR_CHOICE = 'editorchoice',
  SOCIAL_NETWORKS = 'socialnetworks',
}

interface SvgIconProps {
  icon:
    | InstallButtonMode
    | MenuButtonIcon
    | 'smarttagcross'
    | 'redcross'
    | 'logo'
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

    case MenuButtonIcon.ALL_DAPPLETS: {
      return <AllDappletsIcon />
    }

    case MenuButtonIcon.ESSENTIAL_DAPPLETS: {
      return <EssentialDappletsIcon />
    }

    case MenuButtonIcon.FINANCIAL_DAPPLETS: {
      return <FinancialDappletsIcon />
    }

    case MenuButtonIcon.EDITOR_CHOICE: {
      return <EditorChoiceIcon />
    }

    case MenuButtonIcon.SOCIAL_NETWORKS: {
      return <SocialNetworksIcon />
    }

    case 'smarttagcross': {
      return <SmarTagCrossIcon />
    }

    case 'redcross': {
      return <RedCrossIcon />
    }

    case 'logo': {
      return <LogoIcon />
    }

    default: {
      return null
    }
  }
}

export default SvgIcon
