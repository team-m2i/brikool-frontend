import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delay: number = 500) {

    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // Update debounced value after delay
    useEffect(
        () => {
            const timeout = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)
            // Cancel the timeout if value changes (also on delay change or unmount)
            return () => clearTimeout(timeout)
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}