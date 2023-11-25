import { FC } from 'react'

import { EInstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { EMenuButtonIcon } from 'uikit/MenuButton/MenuButton'

import { ReactComponent as ArrowDownIcon } from './icons/arrowDown.svg'
import { ReactComponent as ArrowLeftIcon } from './icons/arrowLeft.svg'
import { ReactComponent as ArrowRightIcon } from './icons/arrowRight.svg'
import { ReactComponent as BurgerIcon } from './icons/burger.svg'
import { ReactComponent as CloudNetworkIcon } from './icons/cloudNetwork.svg'
import { ReactComponent as GlassIcon } from './icons/glass.svg'
import { ReactComponent as GreenTriangleIcon } from './icons/greenTriangle.svg'
import { ReactComponent as InstallIcon } from './icons/InstallButton/install.svg'
import { ReactComponent as InstalledIcon } from './icons/InstallButton/installed.svg'
import { ReactComponent as UninstallIcon } from './icons/InstallButton/uninstall.svg'
import { ReactComponent as LogoIcon } from './icons/logo.svg'
import { ReactComponent as AllDappletsIcon } from './icons/MenuButton/alldapplets.svg'
import { ReactComponent as EditorChoiceIcon } from './icons/MenuButton/editorchoice.svg'
import { ReactComponent as EssentialDappletsIcon } from './icons/MenuButton/essentialdapplets.svg'
import { ReactComponent as FinancialDappletsIcon } from './icons/MenuButton/financialdapplets.svg'
import { ReactComponent as SignOutIcon } from './icons/MenuButton/signout.svg'
import { ReactComponent as SocialNetworksIcon } from './icons/MenuButton/socialnetworks.svg'
import { ReactComponent as RedCrossIcon } from './icons/redcross.svg'
import { ReactComponent as RedTriangleIcon } from './icons/redTriangle.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'
import { ReactComponent as SmartTagCrossIcon } from './icons/SmartTag/smarttagcross.svg'

export interface SvgIconProps {
  userStyles?: string
  icon?:
    | EInstallButtonMode
    | EMenuButtonIcon
    | 'smarttagcross'
    | 'redcross'
    | 'logo'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowDown'
    | 'cloudNetwork'
    | 'settings'
    | 'glass'
    | 'selectArrow'
    | 'burger'
    | 'redTriangle'
    | 'greenTriangle'
}

const SvgIcon: FC<SvgIconProps> = ({ icon, userStyles }) => {
  switch (icon) {
    case EInstallButtonMode.INSTALL: {
      return <InstallIcon />
    }

    case EInstallButtonMode.INSTALLED: {
      return <InstalledIcon />
    }

    case EInstallButtonMode.UNINSTALL: {
      return <UninstallIcon />
    }

    case EMenuButtonIcon.ALL_DAPPLETS: {
      return (
        <div className={userStyles}>
          <AllDappletsIcon />
        </div>
      )
    }

    case EMenuButtonIcon.ESSENTIAL_DAPPLETS: {
      return (
        <div className={userStyles}>
          <EssentialDappletsIcon />
        </div>
      )
    }

    case EMenuButtonIcon.FINANCIAL_DAPPLETS: {
      return (
        <div className={userStyles}>
          <FinancialDappletsIcon />
        </div>
      )
    }

    case EMenuButtonIcon.EDITOR_CHOICE: {
      return (
        <div className={userStyles}>
          <EditorChoiceIcon />
        </div>
      )
    }

    case EMenuButtonIcon.SOCIAL_NETWORKS: {
      return (
        <div className={userStyles}>
          <SocialNetworksIcon />
        </div>
      )
    }

    case EMenuButtonIcon.SIGN_OUT: {
      return (
        <div className={userStyles}>
          <SignOutIcon />
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

    case 'arrowDown': {
      return (
        <div className={userStyles}>
          <ArrowDownIcon />
        </div>
      )
    }

    case 'logo': {
      return (
        <div className={userStyles}>
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
        <div className={userStyles}>
          <GlassIcon />
        </div>
      )
    }

    case 'redTriangle': {
      return <RedTriangleIcon />
    }

    case 'greenTriangle': {
      return <GreenTriangleIcon />
    }

    default: {
      return null
    }
  }
}

export default SvgIcon
