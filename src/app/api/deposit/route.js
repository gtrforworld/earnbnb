import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        var transactions = await excuteQuery("SELECT address AS a, amount AS b, created_at AS c FROM deposit ORDER BY created_at DESC LIMIT 10");
        
        return NextResponse.json({ success: true, message: transactions}, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }
}
