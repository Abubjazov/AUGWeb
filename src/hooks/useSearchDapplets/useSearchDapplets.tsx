import { useState, useEffect } from 'react'

import { useAppSelector } from 'store/hooks'
import { IDapplet } from 'store/slices/dappletsSlice'

export const useSearchDapplets = () => {
  const { dapplets, searchString } = useAppSelector(state => state.dapplets)

  const [items, setItems] = useState<IDapplet[] | undefined>(undefined)

  useEffect(() => {
    if (dapplets?.length && searchString !== '') {
      const items = dapplets.filter(dapplet =>
        dapplet.name.toLowerCase().includes(searchString.toLowerCase()),
      )

      setItems(items)
    } else {
      setItems(dapplets)
    }
  }, [dapplets, searchString])

  return { items }
}
