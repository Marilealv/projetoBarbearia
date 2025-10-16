"use client";

import Image from "next/image";
import { Card, CardContent } from "./card";
import { Barbershop } from "@prisma/client";
import { Button } from "./button";
import { Badge } from "./badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
    barbershop: Barbershop ;
}

const BarbershopItem = ({barbershop}: BarbershopItemProps) => {
    const router = useRouter();

    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`);
    }
    

    return ( 
        <Card className="min-w-full max-w-[167px] rounded-2xl">
            <CardContent className="px-1 py-0 pt-1">
                <div className="w-full h-[159px] relative">
                    <div className="absolute top-2 left-2 z-50">
                        <Badge variant="secondary" className="opacity-90 flex gap-1 items-center top-3 left-3">
                            <StarIcon size={12} className="fill-primary text-primary"/>
                            <span className="text-xs">5,0</span>
                        </Badge>
                    </div>
                   <Image
                        src={barbershop.imageUrl}
                        alt={barbershop.name} 
                        style={{ objectFit: "cover" }}
                        fill
                        className= "rounded-2xl"
                    />
                </div>

                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-2 overflow-hideen text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
     );
};
 
export default BarbershopItem;