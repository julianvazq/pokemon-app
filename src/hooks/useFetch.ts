import { useEffect, useState } from 'react';
import { RequestFn } from '../features/pokemon/types/apiTypes';

type Props<T> = {
    requestFn: RequestFn<T> | null;
    onEnd?: (arg: T) => void;
};

export enum Status {
    Idle,
    Error,
    Fetching,
    Success,
}

const useFetch = <T>({ requestFn, onEnd }: Props<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<Status>(Status.Idle);

    useEffect(() => {
        const fetchData = async (promise: () => Promise<T>) => {
            try {
                setStatus(Status.Fetching);
                const data = await promise?.();
                setData(data);
                setStatus(Status.Success);
                onEnd?.(data);
            } catch (error) {
                setStatus(Status.Error);
                setData(null);
                console.log('Fetching error: ', error);
            }
        };

        if (
            requestFn != null &&
            typeof requestFn === 'function' &&
            [Status.Idle, Status.Success].includes(status)
        ) {
            fetchData(requestFn);
        }
    }, [requestFn]);

    return { data, status };
};

export default useFetch;
