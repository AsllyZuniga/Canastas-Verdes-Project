import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const transactionDate = searchParams.get('transactionDate')
    const authToken = request.cookies.get('auth_token')?.value

    if (!authToken) {
        return Response.json({ message: ['Unauthorized'] }, { status: 401 })
    }

    const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    const response = await req.json()
    return Response.json(response, { status: req.status })
}