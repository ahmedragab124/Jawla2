import React from "react";

// Generic Skeleton Box with shimmer
export function SkeletonBlock({ className = "" }) {
  return (
    <div className={`rounded-2xl bg-[#f4e9d7] animate-shimmer ${className}`} />
  );
}

// Skeleton for Grid Cards (Attractions, Destinations, Experience Cards)
export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-[#f1e7d9] bg-white p-4 shadow-xs space-y-4"
        >
          {/* Image placeholder */}
          <SkeletonBlock className="h-48 w-full rounded-2xl" />

          {/* Title */}
          <SkeletonBlock className="h-6 w-3/4" />

          {/* Subtitle / Category */}
          <SkeletonBlock className="h-4 w-1/2" />

          {/* Description line 1 & 2 */}
          <div className="space-y-2 pt-2">
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-4/5" />
          </div>

          {/* Footer button placeholder */}
          <div className="flex items-center justify-between pt-2">
            <SkeletonBlock className="h-5 w-20" />
            <SkeletonBlock className="h-9 w-28 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton for Admin Tables (Destinations, Attractions, Bookings, Tourists)
export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="rounded-3xl border border-[#f1e7d9] bg-white p-6 shadow-xs space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <SkeletonBlock className="h-7 w-40" />
        <SkeletonBlock className="h-9 w-28 rounded-full" />
      </div>

      {/* Table rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl bg-[#faf6f0] p-4 gap-4"
          >
            <div className="flex items-center gap-3 flex-1">
              <SkeletonBlock className="h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <SkeletonBlock className="h-4 w-1/3" />
                <SkeletonBlock className="h-3 w-1/4" />
              </div>
            </div>
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-8 w-16 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton for Form Fields (Add/Edit Forms)
export function FormSkeleton() {
  return (
    <div className="rounded-4xl border border-[#f1e7d9] bg-white p-8 shadow-xs space-y-6 max-w-3xl">
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-4 w-3/4" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-12 w-full rounded-3xl" />
        </div>
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-12 w-full rounded-3xl" />
        </div>
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-28 w-full rounded-3xl" />
      </div>

      <div className="flex gap-3 pt-2">
        <SkeletonBlock className="h-12 w-36 rounded-full" />
        <SkeletonBlock className="h-12 w-28 rounded-full" />
      </div>
    </div>
  );
}

// Skeleton for Single Detail Pages (Destination / Attraction Details)
export function DetailsPageSkeleton() {
  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Hero Header Skeleton */}
      <SkeletonBlock className="h-[40vh] min-h-75 w-full rounded-4xl" />

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SkeletonBlock className="h-10 w-2/3" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-4/5" />
          <SkeletonBlock className="h-64 w-full rounded-3xl" />
        </div>

        {/* Sidebar Info Card Skeleton */}
        <div className="space-y-4">
          <SkeletonBlock className="h-72 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
