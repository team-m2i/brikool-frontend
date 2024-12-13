import {NextRequest, NextResponse} from 'next/server';
import {BACKEND_SERVER_NAME} from "@/lib/constants";
import {signIn} from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const {refresh_token} = await request.json()
        await signIn(BACKEND_SERVER_NAME, { email: "", password : "", refreshToken: refresh_token, redirect: false});
        return NextResponse.json({ message: 'Sign in successful' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Sign in failed' }, { status: 500 });
    }
}