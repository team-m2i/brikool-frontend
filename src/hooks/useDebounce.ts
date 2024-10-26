import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delay: number) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    // Update debounced value after delay
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}