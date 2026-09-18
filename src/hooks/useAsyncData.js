import { useEffect, useState } from 'react'
import { ASYNC } from '../utils/asyncState'

export function useAsyncData(loader, deps = []) {
  const [state, setState] = useState(ASYNC.loading)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    Promise.resolve().then(() => {
      if (!mounted) return
      setState(ASYNC.loading)
      setError(null)
    })

    loader()
      .then((result) => {
        if (!mounted) return
        const isEmpty = Array.isArray(result) ? result.length === 0 : !result
        setData(result)
        setState(isEmpty ? ASYNC.empty : ASYNC.success)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
        setState(ASYNC.error)
      })

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { state, data, error }
}
