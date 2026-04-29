import { useContext } from 'react'
import { ContentContext } from './ContentContextInternal'

export function useContent() {
  const value = useContext(ContentContext)
  if (!value) throw new Error('useContent must be used inside ContentProvider')
  return value
}

