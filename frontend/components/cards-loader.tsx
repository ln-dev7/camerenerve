import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
} from "@/components/ui/card"

export function CardsLoader() {
  const numbersOfSkeletons = [1, 2, 3]
  return (
    <>
      {numbersOfSkeletons.map((_, index) => (
        <Card
          key={index}
          className="flex flex-col gap-4 items-start justify-between rounded-lg border w-full h-full p-6"
        >
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center justify-start gap-2">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <Skeleton className="h-4 w-[150px]" />
        </Card>
      ))}
    </>
  )
}
