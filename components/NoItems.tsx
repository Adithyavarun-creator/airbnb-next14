import { File } from "lucide-react"

interface NoItemsProps {
    title: string;
    description: string;
}


const NoItems = ({ title, description }: NoItemsProps) => {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <File className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-5 text-xl font-bold">{title}</h2>
            <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
    )
}

export default NoItems