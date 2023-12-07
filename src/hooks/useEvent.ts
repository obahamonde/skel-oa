export const useEvent = <T>(url: string, callback: (data: T) => void | Promise<void>, options?: EventSourceInit, events?: string[]) => {
	const eventSource = new EventSource(url, options);
	const evnts = events ?? ['message'];
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const eventHandler = async (event: Event) => {
			try {
				setLoading(true);
				const data = JSON.parse((event as MessageEvent).data) as T;
				await callback(data);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		for (const event of evnts) {
			eventSource.addEventListener(event, eventHandler);
		}
		return () => {
			for (const event of evnts) {
				eventSource.removeEventListener(event, eventHandler);
			}
			eventSource.close();
		}
	}
		, [callback, evnts, url]);

	return { error, loading };
}
