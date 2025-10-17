"use client";

import { Badge } from "./badge";
import { CardContent } from "./card";
import { Card } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import Image from "next/image";
import { Button } from "./button";
import { cancelBooking } from "@/app/_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AlertDialogFooter, AlertDialogHeader, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import BookingInfo from "./booking-info";


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }}>;
}

const BookingItem = ({booking}: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const isBookingConfirmed = isFuture(booking.date);

    const handleCancelClick = async () => {
        setIsDeleteLoading(true);
        try {
            await cancelBooking(booking.id);

            toast.success("Reserva cancelada com sucesso!");
        } catch (error) {
            console.error(error);   
        } finally {
            setIsDeleteLoading(false);
        }
    }

    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-full">
                    <CardContent className="flex py-0 px-0">
                        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                            <Badge variant={
                            isBookingConfirmed ? "secondary" : "default"
                            } className="w-fit">{
                                isBookingConfirmed ? "Finalizado" : "Confirmado"
                                }</Badge>
                            <h2 className="font-bold">{booking.service.name}</h2>

                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={booking.barbershop.imageUrl}/>
                                </Avatar>

                                <h3 className="text-sm">{booking.barbershop.name}</h3>
                            </div>
                        </div>

                        <div className="fleex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
                            <p className="text-sm capitalize">{format(
                                booking.date, "MMMM",{
                                locale: ptBR,
                                })}</p>
                            <p className="text-2xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className="p-0">
                <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
                    <SheetTitle>Informações da reserva</SheetTitle>
                </SheetHeader>

                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                    <Image src="/barbershop-map.png" fill alt={booking.barbershop.name}/>

                    <div className="w-full absolute bottom-4 left-0 px-5">
                        <Card>
                            <CardContent className="p-3 flex gap-2 ">
                                <Avatar>
                                    <AvatarImage src={booking.barbershop.imageUrl}/>
                                </Avatar>

                                <div>
                                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                                    <h3 className="text-xs overflow-hidden text-ellipsis text-nowrap">{booking.barbershop.address}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Badge variant={isBookingConfirmed ? "secondary" : "default"}
                    className="w-fit my-3">{isBookingConfirmed ? "Finalizado" : "Confirmado"}
                </Badge>

                <BookingInfo booking={booking}/>

                    <SheetFooter className="flex-row gap-3 mt-6">
                        <SheetClose asChild>
                            <Button className="w-full" variant="secondary">Voltar</Button>
                        </SheetClose>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    disabled={!isBookingConfirmed || isDeleteLoading} 
                                    className="w-full" 
                                    variant="destructive"
                                >
                                    Cancelar Reserva
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%]">
                                <AlertDialogHeader>
                                <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Uma vez cancelada, não será possível reverter essa ação.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row gap-3">
                                <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
                                <AlertDialogAction disabled={isDeleteLoading} className="w-full" onClick={handleCancelClick}>
                                    {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetFooter>  
                </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default BookingItem;