import { useEffect, useState } from "react";

export const useDebouncer = (query: string, timer: number) => {
    const [value, setValue] = useState<string>(query);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(query)
        }, timer);

        return () => clearInterval(interval)
    }, [query, timer])

    return value
}