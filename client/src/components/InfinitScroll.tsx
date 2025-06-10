"use client"

import type React from "react"

import { useEffect, useRef, useCallback, useState } from "react"
import { Loader2 } from "lucide-react"

interface InfiniteScrollProps {
  children: React.ReactNode
  onLoadMore: () => void
  hasMore?: boolean
  loading?: boolean
  threshold?: number
  className?: string
  loadingComponent?: React.ReactNode
  endMessage?: React.ReactNode
}

export default function InfiniteScroll({
  children,
  onLoadMore,
  hasMore = true,
  loading = false,
  threshold = 100,
  className = "",
  loadingComponent,
  endMessage,
}: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleLoadMore = useCallback(() => {
    if (isLoading || loading || !hasMore) return

    setIsLoading(true)
    try {
      onLoadMore()
    } catch (error) {
      console.error("Error loading more items:", error)
    } finally {
      setIsLoading(false)
    }
  }, [onLoadMore, isLoading, loading, hasMore])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        handleLoadMore()
      }
    }, options)

    observerRef.current.observe(sentinel)

    return () => {
      if (observerRef.current && sentinel) {
        observerRef.current.unobserve(sentinel)
      }
    }
  }, [handleLoadMore, threshold, hasMore])

  const defaultLoadingComponent = (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 h-full w-full animate-ping rounded-full bg-primary/30 opacity-75"></div>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-muted-foreground">Loading more items...</span>
    </div>
  )

  const defaultEndMessage = (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </div>
      <h4 className="mt-3 text-base font-medium">You've reached the end</h4>
      <p className="mt-1 text-sm text-muted-foreground">No more items to display</p>
    </div>
  )

  return (
    <div className={className}>
      {children}

      {hasMore && <div ref={sentinelRef} className="h-1" />}

      {(isLoading || loading) && hasMore && (loadingComponent || defaultLoadingComponent)}

      {!hasMore && (endMessage || defaultEndMessage)}
    </div>
  )
}
