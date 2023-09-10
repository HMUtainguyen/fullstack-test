// @ts-nocheck
import React, { useEffect, useRef } from 'react';
interface LoadMoreProps {
  containerElement: any;
  loadMore: any;
  rootMargin: string;
}
const LoadMore = (props: LoadMoreProps) => {
  const { containerElement, loadMore, rootMargin } = props;
  const elementRef = useRef();
  useEffect(() => {
    const config = {
      root: containerElement,
      rootMargin: rootMargin || '0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(loadMore, config);
    observer.observe(elementRef.current);
    // return () => observer.unobserve(elementRef.current);
  }, []);
  return <div className="opacity-0" ref={elementRef}></div>;
};

export default LoadMore;
