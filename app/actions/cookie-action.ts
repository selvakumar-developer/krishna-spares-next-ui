'use server'

import { cookies } from 'next/headers';


export async function setCookie(
    name: string,
    value: string,
    options?: any
) {
    const cookieStore = await cookies()
    cookieStore.set(name, value, { secure: true, httpOnly: true, ...options })
}

export async function getCookie(name: string) {
    const cookieStore = await cookies()
    return cookieStore.get(name)?.value
}