import axios from "axios";

/**
 * Fetches data from the API for useSWR
 */
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
