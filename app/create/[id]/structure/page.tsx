import { createCategoryPage } from "@/app/actions";
import CreationBottomBar from "@/components/CreationBottomBar";
import SelectCategory from "@/components/SelectCategory";


export default function StructureRoutes({ params }: { params: { id: string } }) {


    return (
        <>
            <div className="w-3/5 mx-auto">
                <h1 className="text-3xl font-semibold tracking-tight transition-colors">
                    Which of these best describe your home !
                </h1>
            </div>


            <form action={createCategoryPage}>
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory />

                <CreationBottomBar />
            </form>
        </>
    )
}