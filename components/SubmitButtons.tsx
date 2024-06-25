"use client"

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Heart, Loader2 } from 'lucide-react'


const CreationSubmit = () => {

    const { pending } = useFormStatus()

    return (
        <>
            {pending ?
                <Button disabled size='lg' type='submit'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                </Button> :
                <Button size='lg' type='submit'>Save</Button>
            }
        </>
    )
}

export default CreationSubmit


export function AddToFavoriteButton() {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button
                    variant="outline"
                    size="icon"
                    disabled
                    className="bg-primary-foreground"
                >
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Button>
            ) : (
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary-foreground"
                    type="submit"
                >
                    <Heart className="w-4 h-4" />
                </Button>
            )}
        </>
    )
}

export function DeleteFromFavorite() {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button
                    variant="outline"
                    size="icon"
                    disabled
                    className="bg-primary-foreground"
                >
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Button>
            ) : (
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary-foreground"
                    type="submit"
                >
                    <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
                </Button>
            )}
        </>
    )
}



export function ReservationSubmitButton() {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button
                    disabled
                    className="w-full"
                >
                    <Loader2 className="h-4 w-4 animate-spin ml-2" /> Please wait...
                </Button>
            ) : (
                <Button

                    className="w-full"
                    type="submit"
                >
                    Make a Reservation
                </Button>
            )}
        </>
    )
}