const { useState, useEffect, useCallback, useRef } = wp.element;
const apiFetch = wp.apiFetch;
const { addQueryArgs } = wp.url;

export function useTaxonomies(type) {
  const [taxonomies, setTaxonomies] = useState([]);

  const timeout = useRef();
  const fetchController = useRef();
  const fetchTaxonomies = useCallback(() => {
    clearTimeout(timeout.current);

    if (fetchController.current?.signal.aborted === false) {
      fetchController.current.abort();
    }

    if (!type) return Promise.resolve({});

    fetchController.current = new AbortController();
    return new Promise((res, rej) => {
      timeout.current = setTimeout(() => {
        apiFetch({
          path: addQueryArgs("wp/v2/taxonomies", { type }),
          signal: fetchController.signal,
        })
          .then(res)
          .catch(rej);
      }, 300);
    });
  }, [type]);

  useEffect(() => {
    setTaxonomies([]);
    fetchTaxonomies()
      .then((data) => setTaxonomies(Object.values(data)))
      .catch(() => setTaxonomies([]));
  }, [fetchTaxonomies]);

  return taxonomies;
}
