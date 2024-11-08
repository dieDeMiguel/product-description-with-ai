import React from 'react'
import { Skeleton } from './skeleton'

export default function SkeletonTags() {
  return (
    <div className='w-3/4 space-y-2 mt-4 m-auto'>
    <Skeleton className="w-24 h-6" />
    <Skeleton className="w-full h-6" />
    <Skeleton className="w-full h-6" />
    <Skeleton className="w-full h-6" />
    </div>
  )
}
