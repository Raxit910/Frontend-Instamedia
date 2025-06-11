import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { feedApi } from '../api/feedApi';

export const useInfiniteScrollPosts = () => {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null); // initially null to fetch first page
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await feedApi.getFeed({ cursor }); // cursor-based call
      const { posts: newPosts, nextCursor } = res.data;

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const filtered = newPosts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...filtered];
      });
      setCursor(nextCursor);
      setHasMore(!!nextCursor); // if no nextCursor, no more data
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) fetchPosts();
  }, [inView]);

  useEffect(() => {
    fetchPosts(); // initial load
  }, []);

  return { posts, loading, hasMore, loaderRef: ref };
};
