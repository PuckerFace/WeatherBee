import React from 'react';
import { Skeleton } from './ui/skeleton';

const SkeletonComponent = () => {
  return (
    <div className="space-y-6">
      <div className=" grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
      <div className=" grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
      <div className=" grid gap-6 md:grid-cols-2 ">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonComponent;
