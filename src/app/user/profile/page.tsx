'use client'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/common/ErrorFallback'
import { memo } from 'react'

// Lazy load components
const GeneralInfoBox = lazy(() => import('@/components/leader/GeneralInfoBox').then(mod => ({ default: mod.GeneralInfoBox })))
const PersonalInfoBox = lazy(() => import('@/components/leader/PersonalInfoBox').then(mod => ({ default: mod.PersonalInfoBox })))

// Loading component
const LoadingComponent = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-200 rounded-md"></div>
  </div>
)

const AdminProfilePage = () => {
  return (
    <div className="flex gap-5 w-full max-lg:flex-col">
      {/* Personal Info Section */}
      <div className="w-[28%] max-2xl:w-[31%] max-xl:w-[35%] max-lg:w-full">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingComponent />}>
            <PersonalInfoBox />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* General Info Section */}
      <div className="w-[72%] max-2xl:w-[69%] max-xl:w-[65%] max-lg:w-full">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingComponent />}>
            <GeneralInfoBox />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(AdminProfilePage)
