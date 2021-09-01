import { useEffect, useState } from "react"

export const useMounted = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setIsReady(true)
    }, [])

    return isReady
}