export const useRequest = <T>(url: string, options?: RequestInit) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(url, options);
				const json = await res.json();
				setData(json);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [options, url]);

	return { data, error, loading };
}
