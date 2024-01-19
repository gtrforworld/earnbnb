import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    var walletAddress = searchParams.get('address');

    if (walletAddress) {
        try {
            var getUser = await excuteQuery(`SELECT id FROM users WHERE address = '${walletAddress}' LIMIT 1`);
            var userId = 0;
            if(getUser.length > 0) {
                userId = getUser[0].id;
            }
            return NextResponse.json({ success: true, message: {id: userId} }, {status: 200});

        } catch (error) {
            return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
        }
    } else {
        return NextResponse.json({ success: false, message: 'address is required' }, {status: 400});
    }
}