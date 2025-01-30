// import { Card, CardContent } from "../components/ui/card"
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";







const Caroseal = ({ data }: { data: any }) => {
  return (
    <Carousel className="w-full ">
    <CarouselContent className="-ml-1">
      {data.map((item:any, index:any) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <img
                  src={item.imageUrl}
                  alt={`carousel-item-${index}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-center text-gray-600">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default Caroseal