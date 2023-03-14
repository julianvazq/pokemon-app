import { useEffect, useState } from 'react';

type Props<T> = {
    promise: Promise<T> | null;
    dispatch?: (arg: T) => void;
};

export enum Status {
    Idle,
    Error,
    Fetching,
    Success,
}

const useFetch = <T>({ promise, dispatch }: Props<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<Status>(Status.Idle);

    useEffect(() => {
        const fetchData = async (promise: Promise<T>) => {
            try {
                setStatus(Status.Fetching);
                const data = await promise;
                setData(data);
                setStatus(Status.Success);
                dispatch?.(data);
            } catch (error) {
                setStatus(Status.Error);
                console.log('Fetching error: ', error);
            }
        };

        if (promise && data == null && status !== Status.Success) {
            fetchData(promise);
        }
    }, [promise, dispatch]);

    return { data, status };
};

export default useFetch;
