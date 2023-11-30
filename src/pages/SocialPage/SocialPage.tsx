import { FC } from 'react'

import StandardModal from 'components/StandardModal'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

import styles from './SocialPage.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SocialPageProps {}

const socialNetworksList = [
  {
    alt: 'Telegram logo',
    href: 'https://telegram.org/',
    src: '/images/telegram.svg',
  },
  {
    alt: 'Whatsapp logo',
    href: 'https://www.whatsapp.com/',
    src: '/images/whatsapp.svg',
  },
  {
    alt: 'Facebook logo',
    href: 'https://www.facebook.com/',
    src: '/images/facebook.svg',
  },
  {
    alt: 'Twitter logo',
    href: 'https://twitter.com/',
    src: '/images/twitter.svg',
  },
]

const SocialPage: FC<SocialPageProps> = () => {
  const navigate = useNavigate()

  return (
    <main className={styles.root}>
      <StandardModal
        welcomeMode
        modalContent={
          <div className={styles['root-wrapper']}>
            <span className={styles.title}>Our social networks</span>

            <div className={styles['icon-wrapper']}>
              <img
                height={'70px'}
                className={styles.logo}
                src={'/images/arrowleft.svg'}
                alt="Go home"
                onClick={() => navigate('/')}
              />

              {socialNetworksList.map(social => (
                <a
                  key={nanoid()}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={social.href}
                >
                  <img
                    height={'70px'}
                    className={styles.logo}
                    src={social.src}
                    alt={social.alt}
                  />
                </a>
              ))}
            </div>
          </div>
        }
      />
    </main>
  )
}

export default SocialPage
