import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardsLoader() {
  const numbersOfSkeletons = [1, 2, 3]
  return (
    <>
      {numbersOfSkeletons.map((_, index) => (
        <Card
          key={index}
          className="flex h-full w-full flex-col items-start justify-between gap-4 rounded-lg border p-6"
        >
          <div className="flex w-full flex-col items-start justify-start gap-1">
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
