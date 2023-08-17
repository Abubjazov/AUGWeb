import { FC } from 'react'

import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { MenuButtonIcon } from 'uikit/MenuButton/MenuButton'

import { ReactComponent as ArrowLeftIcon } from './icons/arrowLeft.svg'
import { ReactComponent as ArrowRightIcon } from './icons/arrowRight.svg'
import { ReactComponent as BurgerIcon } from './icons/burger.svg'
import { ReactComponent as CloudNetworkIcon } from './icons/cloudNetwork.svg'
import { ReactComponent as GlassIcon } from './icons/glass.svg'
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
import { ReactComponent as SelectArrowIcon } from './icons/selectArrow.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'
import { ReactComponent as SmartTagCrossIcon } from './icons/SmartTag/smarttagcross.svg'

interface SvgIconProps {
  styles?: string
  icon:
    | InstallButtonMode
    | MenuButtonIcon
    | 'smarttagcross'
    | 'redcross'
    | 'logo'
    | 'arrowLeft'
    | 'arrowRight'
    | 'cloudNetwork'
    | 'settings'
    | 'glass'
    | 'selectArrow'
    | 'burger'
}

const SvgIcon: FC<SvgIconProps> = ({ icon, styles }) => {
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
      return (
        <div className={styles}>
          <AllDappletsIcon />
        </div>
      )
    }

    case MenuButtonIcon.ESSENTIAL_DAPPLETS: {
      return (
        <div className={styles}>
          <EssentialDappletsIcon />
        </div>
      )
    }

    case MenuButtonIcon.FINANCIAL_DAPPLETS: {
      return (
        <div className={styles}>
          <FinancialDappletsIcon />
        </div>
      )
    }

    case MenuButtonIcon.EDITOR_CHOICE: {
      return (
        <div className={styles}>
          <EditorChoiceIcon />
        </div>
      )
    }

    case MenuButtonIcon.SOCIAL_NETWORKS: {
      return (
        <div className={styles}>
          <SocialNetworksIcon />
        </div>
      )
    }

    case 'smarttagcross': {
      return <SmartTagCrossIcon />
    }

    case 'redcross': {
      return <RedCrossIcon />
    }

    case 'arrowLeft': {
      return <ArrowLeftIcon />
    }

    case 'arrowRight': {
      return <ArrowRightIcon />
    }

    case 'logo': {
      return (
        <div className={styles}>
          <LogoIcon />
        </div>
      )
    }

    case 'cloudNetwork': {
      return <CloudNetworkIcon />
    }

    case 'settings': {
      return <SettingsIcon />
    }

    case 'burger': {
      return <BurgerIcon />
    }

    case 'glass': {
      return (
        <div className={styles}>
          <GlassIcon />
        </div>
      )
    }

    case 'selectArrow': {
      return (
        <div className={styles}>
          <SelectArrowIcon />
        </div>
      )
    }

    default: {
      return null
    }
  }
}

export default SvgIcon
