import React from 'react'
import { Skeleton } from './skeleton'

export default function SkeletonTags() {
  return (
    <div className='animate-pulse w-3/4 space-y-2 mt-4 m-auto'>
    <Skeleton className="w-24 h-6 rounded" />
    <Skeleton className="w-full h-6 rounded" />
    <Skeleton className="w-full h-6 rounded" />
    <Skeleton className="w-full h-6 rounded" />
    </div>
  )
}
