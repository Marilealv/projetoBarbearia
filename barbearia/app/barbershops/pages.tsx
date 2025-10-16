import { db } from "@/app/_lib/prisma";
import Header from "../components/ui/header";
import BarbershopItem from "../components/ui/barbershop-item";
import { redirect } from "next/navigation";
import Search from "../components/ui/search";
interface BarbeshopsPageProps {
    searchParams: {
        search?: string;
    }
}

const BarbeshopsPage = async ({searchParams}: BarbeshopsPageProps) => {
    if(!searchParams.search) {
        return redirect("/")
    }
    const barbershops = await db.barbershop.findMany({
        where: {
            name: { 
                contains: searchParams.search,
                mode: 'insensitive'
            } }
    });
    return <>
        <Header />

        <div className="px-5 py-6 flex flex-col gap-6">
            <Search defaultValues={{ 
                search: searchParams.search,
                
            }} 
            />

            <h1 className="text-gray-400 font-bold text-xs uppercase">
                Resultados para &quot;{searchParams.search}&quot;
            </h1>

            <div className="grid grid-cols-2 gap-4">
                {barbershops.map(barbershop => (
                    <div key={barbershop.id} className="w-full">
                        <BarbershopItem barbershop={barbershop} />
                    </div>
                ))}
            </div>
        </div>
    </>;
};
 
export default BarbeshopsPage;