"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

const Counter = ({ name }: { name: string }) => {

    const [amount, setAmount] = useState(0)

    const increase = () => {
        setAmount(amount + 1)
    }

    const decrease = () => {
        if (amount > 0) {
            setAmount(amount - 1)
        }
    }

    return (
        <div className="flex items-center gap-x-4">
            <input type="hidden" name={name} value={amount} />
            <Button onClick={decrease} variant='outline' size='icon' type="button">
                <Minus className="h-4 w-4 text-primary" />
            </Button>
            <p className="font-medium text-lg">{amount}</p>
            <Button variant='outline' size='icon' type="button"
                onClick={increase}
            >
                <Plus className="h-4 w-4 text-primary" />
            </Button>
        </div>
    )
}

export default Counter