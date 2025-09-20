import { useState, useEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFn<T> = (...args: any[]) => Promise<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApi<T>(apiFn: ApiFn<T>, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({});

    const execute = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (...args: any[]) => {
            try {
                setLoading(true);
                setError(null);
                const result = await apiFn(...args);
                setData(result);
                return result;
            } catch {
                setError("Something went wrong");
                return null;
            } finally {
                setLoading(false);
            }
        },
        [apiFn]
    );

    useEffect(() => {
        execute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error, refetch: execute , pagination, };
}
